import { 
    FacebookOutlined, 
    LinkedinOutlined, 
    TwitterOutlined, 
    InstagramOutlined, 
    YoutubeOutlined 
  } from '@ant-design/icons';
  
  const SocialMediaLinks = () => (
    <div className="flex space-x-6 text-2xl">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1877F2] hover:opacity-80"
        aria-label="Facebook"
      >
        <FacebookOutlined />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0077B5] hover:opacity-80"
        aria-label="LinkedIn"
      >
        <LinkedinOutlined />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#E4405F] hover:opacity-80"
        aria-label="Instagram"
      >
        <InstagramOutlined />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF0000] hover:opacity-80"
        aria-label="YouTube"
      >
        <YoutubeOutlined />
      </a>
    </div>
  );
  
  export default SocialMediaLinks;
  