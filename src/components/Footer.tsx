'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {

  return (
    <footer id="oa-final-footer">
      {/* Main Footer Links Container */}
      <div className="footer-top-container">
        {/* Left Brand & Description Block */}
        <div className="footer-left-block">
          <Link href="/" className="footer-logo-group">
            <span className="footer-logo-text">Odisha Aspirants</span>
          </Link>
          <p className="footer-description">
            Odisha&apos;s premier recruitment & mock test portal providing authentic notifications, admit cards, answer keys, results, notes and CBT test practice.
          </p>
        </div>

        {/* Right Contacts & Social Media Block */}
        <div className="footer-right-block">
          <div className="footer-email-row">
            <span className="footer-email-text">support@odishaaspirants.com</span>
            <a href="mailto:support@odishaaspirants.com" className="email-icon-btn" aria-label="Email Us">
              📧
            </a>
          </div>

          {/* Temporarily hidden social links
          <div className="footer-social-row">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-circle social-circle-youtube">
              <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>YT</span>
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="social-circle social-circle-telegram">
              <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>TG</span>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-circle social-circle-whatsapp">
              <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>WA</span>
            </a>
          </div>
          */}
        </div>
      </div>

      {/* Bottom Copyright & Legal Links Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-copyright-text">
            © {new Date().getFullYear()} <strong>Odisha Aspirants</strong>. All Rights Reserved.
          </p>
          <ul className="footer-bottom-links">
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        #oa-final-footer {
          background: #000000 !important;
          color: #94a3b8 !important;
          font-family: 'Poppins', 'Outfit', sans-serif;
          font-size: 0.92rem;
          padding-top: 50px;
          position: relative;
          margin-top: 80px;
        }

        .footer-top-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem 40px 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 30px;
        }

        .footer-left-block {
          max-width: 450px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-logo-group {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .footer-logo-text {
          color: #ffffff;
          font-size: 1.4rem;
          font-weight: 800;
          font-family: 'Poppins', sans-serif;
        }

        .footer-description {
          color: #94a3b8;
          font-size: 0.88rem;
          line-height: 1.6;
          margin: 0;
        }

        .footer-right-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
        }

        .footer-email-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-email-text {
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
        }

        .email-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1e293b;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }

        .email-icon-btn:hover {
          background: #334155;
        }

        .footer-social-row {
          display: flex;
          gap: 12px;
        }

        .social-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          font-size: 1.1rem;
          transition: transform 0.2s;
        }

        .social-circle:hover {
          transform: scale(1.08);
        }

        .social-circle-youtube {
          background: #ff0000;
        }
        .social-circle-telegram {
          background: #0088cc;
        }
        .social-circle-whatsapp {
          background: #25d366;
        }

        .footer-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 1.5rem;
          background: #000000;
        }

        .footer-bottom-container {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .footer-copyright-text {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }

        .footer-copyright-text strong {
          color: #94a3b8;
        }

        .footer-bottom-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-bottom-links :global(a) {
          color: #64748b;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s ease;
          font-weight: 500;
        }

        .footer-bottom-links :global(a:hover) {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .footer-top-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;
            padding: 0 1rem 30px 1rem;
          }
          .footer-left-block {
            align-items: center;
          }
          .footer-right-block {
            align-items: center;
          }
          .footer-bottom-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }
          .footer-copyright-text {
            text-align: center;
          }
          .footer-bottom-links {
            justify-content: center;
            gap: 12px 18px;
          }
          .footer-bottom-bar {
            padding: 20px 1rem 80px 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
