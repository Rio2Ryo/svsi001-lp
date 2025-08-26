import React from "react";
import { useI18n } from "../lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const tr = (key) => t(key) ?? "";

  const brand     = tr("footer.brand");        
  const model     = tr("footer.model");        
  const company   = tr("footer.company");      
  const zip       = tr("footer.zip");          
  const address   = tr("footer.address");      
  const emailText = tr("footer.emailText");    
  const legalText = tr("footer.legalText");    

  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.textCenter}>

            {/* ← ここにロゴを追加 */}
            <img 
              src="/MV_LOGO.png" 
              alt="Mother Vegetables Logo" 
              style={styles.logo}
            />

           
            <div style={styles.section}>
              <p style={styles.company}>{company}</p>
              <p style={styles.text}>{zip}</p>
              <p style={styles.text}>
                {address.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <a href="mailto:info@dotpb.jp" style={styles.email}>
                {emailText}
              </a>
            </div>

            <div style={styles.section}>
              <a
                href="https://www.dotpb.jp/specified-commercial-transactions-act"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {legalText}
              </a>
            </div>

            <div style={styles.separator} className="separator" />

            <p style={styles.copyright} className="copyright">
              {tr("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (min-width: 768px) {
          h3.title {
            font-size: 1.5rem !important;
          }
          p.subtitle {
            font-size: 1.125rem !important;
          }
          p.copyright {
            font-size: 0.875rem !important;
          }
          div.separator {
            width: 8rem !important;
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  footer: {
    padding: "4rem 1rem",
    backgroundColor: "#f3f4f6",
    borderTop: "1px solid #e5e7eb",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  textCenter: {
    textAlign: "center",
  },
  logo: {
    maxWidth: "200px",
    margin: "0 auto 1rem",
    display: "block",
  },
  title: {
    fontSize: "1.25rem",
    color: "#b8860b",
    marginBottom: "1rem",
    fontWeight: 300,
    letterSpacing: "0.1em",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#4b5563",
    marginBottom: "2rem",
  },
  section: {
    marginBottom: "2rem",
  },
  company: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "0.5rem",
  },
  text: {
    fontSize: "0.875rem",
    color: "#4b5563",
  },
  email: {
    fontSize: "0.875rem",
    color: "#b8860b",
    textDecoration: "none",
  },
  link: {
    fontSize: "0.875rem",
    color: "#4b5563",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  separator: {
    width: "6rem",
    height: "1px",
    background: "linear-gradient(to right, transparent, #B8860B, transparent)",
    margin: "2rem auto",
  },
  copyright: {
    fontSize: "0.75rem",
    color: "#6b7280",
    fontWeight: 300,
  },
};
