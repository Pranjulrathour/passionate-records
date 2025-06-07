
import { Instagram, Youtube, Music } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: 'INSTAGRAM',
      icon: Instagram,
      url: 'https://instagram.com/passionaterecords',
      color: 'hover:text-pink-500'
    },
    {
      name: 'YOUTUBE',
      icon: Youtube,
      url: 'https://youtube.com/@passionaterecords',
      color: 'hover:text-red-500'
    },
    {
      name: 'SPOTIFY',
      icon: Music,
      url: 'https://open.spotify.com/user/passionaterecords',
      color: 'hover:text-green-500'
    }
  ];

  return (
    <div className={`flex space-x-6 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-passionate-white/70 ${social.color} transition-colors duration-300 group`}
          aria-label={social.name}
        >
          <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
