import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";

import logo from "./main-logo.png";
import linkedin from "./linkedin.png";
import youtube from "./youtube.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";
// import { Link, useNavigate } from 'react-router-dom';

const isMobile = window.innerWidth < 768;

const AmigoCard = (props) => {
  return (
    <div style={{ flex: "1.75" }}>
      <img
        src={logo}
        style={
          !isMobile
            ? { height: "2em" }
            : { height: "2em", marginBottom: "0.5em" }
        }
      ></img>
      {!isMobile && (
        <div
          style={{
            color: "#64607D",
            fontSize: "16px",
            margin: "1em 0 1.5em",
          }}
        >
          Simplifying Invoice Generation for
          <br /> B2C/B2B brands & teams
        </div>
      )}
      <div className="flex">
        <a
          href="https://in.linkedin.com/company/amigo-data"
          rel="noopener noreferrer"
        >
          <img
            src={linkedin}
            style={{ marginRight: "1em", height: "30px", cursor: "pointer" }}
          ></img>
        </a>
        <a href="https://www.youtube.com/channel/UCimo_vtB3TfLSrD-ihCqBgA">
          <img
            src={youtube}
            style={{ marginRight: "1em", height: "30px", cursor: "pointer" }}
          ></img>
        </a>
        <a href="http://instagram.com/getamigo" rel="noopener noreferrer">
          <img
            src={instagram}
            style={{ marginRight: "1em", height: "30px", cursor: "pointer" }}
          ></img>
        </a>
        <a href="https://twitter.com/amigo_data" rel="noopener noreferrer">
          <img
            src={twitter}
            style={{ marginRight: "1em", height: "30px", cursor: "pointer" }}
          ></img>
        </a>
      </div>
    </div>
  );
};

const CompanyCard = (props) => {
  return (
    <div className={styles.footerItem}>
      <div
        style={
          !isMobile
            ? { fontWeight: "700", fontSize: "20px" }
            : {
                fontWeight: "700",
                fontSize: "17px",
              }
        }
      >
        Company
      </div>
      <div>
        {/* <div
          className={styles.click}
          onClick={() => {
            props.navigate("/");
          }}
        >
          About Us
        </div> */}
        <a href="/" rel="noopener noreferrer">
          <div className={styles.click}>Support</div>
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank">
          <div className={styles.click}>Privacy Policy</div>
        </a>
        <a href="/" rel="noopener noreferrer" target="_blank">
          <div className={styles.click}>Terms of Service</div>
        </a>
        <a href="https://blog.tryamigo.com" rel="noopener noreferrer">
          <div className={styles.click}>Blog</div>
        </a>
      </div>
    </div>
  );
};

const ProductCard = (props) => {
  return (
    <div className={styles.footerItem}>
      <div
        style={
          !isMobile
            ? { fontWeight: "700", fontSize: "20px" }
            : {
                fontWeight: "700",
                fontSize: "17px",
              }
        }
      >
        Product
      </div>
      <div>
        {/* <div className={styles.click}>Integration</div>
        <div className={styles.click}>How It Works</div> */}
        <a href="/" rel="noopener noreferrer">
          <div className={styles.click}>One-Click Invoices</div>
        </a>
        <a href="/" rel="noopener noreferrer">
          <div className={styles.click}>Free Invoice Setup</div>
        </a>
        <a href="/" rel="noopener noreferrer">
          <div className={styles.click}>Preset Invoices</div>
        </a>
        <a href="/" rel="noopener noreferrer">
          <div className={styles.click}>Custom Templates</div>
        </a>
      </div>
    </div>
  );
};

const ContactCard = (props) => {
  return (
    <div className={styles.footerItem}>
      <div
        style={
          !isMobile
            ? { fontWeight: "700", fontSize: "20px" }
            : {
                fontWeight: "700",
                fontSize: "17px",
              }
        }
      >
        Contact
      </div>
      <div>
        <div style={!isMobile ? { margin: "1em 0" } : {}}>
          UG-006, MGF Metropolis Mall Gurugram, Haryana 122002
        </div>
        <div style={!isMobile ? { margin: "1em 0" } : {}}>+91 96870 29466</div>
        <div style={!isMobile ? { margin: "1em 0" } : {}}>
          {" "}
          support@amigo.gg
        </div>
        <div style={!isMobile ? { margin: "1em 0" } : {}}>
          GSTIN: 06ABWFA0197P1ZN
        </div>
        <div style={!isMobile ? { margin: "1em 0" } : {}}> CIN : AAY-3370</div>
      </div>
    </div>
  );
};

function NewFooter(props) {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <AmigoCard isMobile={isMobile} />
        <div className={styles.footerMain}>
          <div className={styles.footerGroup}>
            <ProductCard isMobile={isMobile} />
            <CompanyCard isMobile={isMobile} />
          </div>
          <ContactCard isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.footerEnd}>
        <div>Copyright @ Amigo 2022. All Rights Reserved.</div>
        <div>Business Name: Amigo Softcom LLP</div>
      </div>
    </div>
  );
}

export default NewFooter;
