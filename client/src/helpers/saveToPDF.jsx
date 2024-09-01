import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const compressImage = (dataUrl, quality) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      // Set a white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob(
        (blob) => {
          const compressedDataUrl = URL.createObjectURL(blob);
          resolve(compressedDataUrl);
        },
        "image/jpeg",
        quality
      );
    };
  });
};

const saveAsPDF = async (invoiceNumber) => {
  const dom = document.getElementById("print");
  try {
    const dataUrl = await toPng(dom);
    // Compress the image
    const compressedQuality = 0.7; // Adjust the quality as needed
    const compressedDataUrl = await compressImage(dataUrl, compressedQuality);

    // Initialize the PDF.
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [5.5, 8.5],
      // Set background color of the PDF to white
      backgroundColor: "white",
    });

    // Define reused data
    const img = new Image();
    img.src = compressedDataUrl;
    await new Promise((resolve) => (img.onload = resolve));

    const imgProps = pdf.getImageProperties(img);
    const imageType = imgProps.fileType;
    const pdfWidth = pdf.internal.pageSize.getWidth();

    // Calculate the number of pages.
    const pxFullHeight = imgProps.height;
    const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
    const nPages = Math.ceil(pxFullHeight / pxPageHeight);

    // Define pageHeight separately so it can be trimmed on the final page.
    let pageHeight = pdf.internal.pageSize.getHeight();

    // Create a one-page canvas to split up the full image.
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");
    pageCanvas.width = imgProps.width;
    pageCanvas.height = pxPageHeight;

    for (let page = 0; page < nPages; page++) {
      // Trim the final page to reduce file size.
      if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
        pageCanvas.height = pxFullHeight % pxPageHeight;
        pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
      }
      // Display the page.
      const w = pageCanvas.width;
      const h = pageCanvas.height;
      pageCtx.fillStyle = "white";
      pageCtx.fillRect(0, 0, w, h);
      pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

      // Add the page to the PDF.
      if (page) pdf.addPage();

      const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
      pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
    }
    // Output / Save
    pdf.save(`invoice-${invoiceNumber}.pdf`);
  } catch (error) {
    console.error("Oops, something went wrong!", error);
  }
};

export default saveAsPDF;
