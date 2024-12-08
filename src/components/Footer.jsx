import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r to-blue-800  from-blue-300 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Complaint Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
