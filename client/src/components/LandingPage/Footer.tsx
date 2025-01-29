const Footer = () => {
  return (
    <div className="bg-[#1b1b1b] text-white py-12">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CodeX</h3>
            <p className="text-sm">
              Copyright © 2025 CodeX
              <br />
              All rights reserved
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
