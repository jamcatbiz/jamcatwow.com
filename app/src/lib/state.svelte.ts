export const contents = {
  games: [
    {
      name: "Anagrams",
      description: 'Find as many words as you can before time runs out. The more letters, the more points.',
      link: "/games/anagrams",
      linkText: "Play",
      newPage: false,
      labels: ['word', 'timed'],
      color: "primary",
    },
    {
      name: "Ladders",
      description: 'Classic word ladders puzzle. Change one letter at a time, step by step, from one word to the next.',
      link: "/games/ladders",
      linkText: "Play",
      newPage: false,
      labels: ['word'],
      color: "error",
    },
    {
      name: "Numbers",
      description: 'Familiar number game where you race the clock, using basic math operations to reach goal numbers.',
      link: "/games/numbers",
      linkText: "Play",
      newPage: false,
      labels: ['number', 'timed'],
      color: "accent",
    },
    {
      name: "Hashbang",
      description: 'Swap letters to find a valid hashtag crossword. Fewer swaps the better.',
      link: "/games/hashbang",
      linkText: "Play",
      newPage: false,
      labels: ['word'],
      color: "info",
    }
  ],
};

export const footerLinks = {
  links: [
    {
      route: '/',
      text: '© 2025 JamCatBiz',
    },
    {
      route: 'help/contact_us',
      text: 'Contact Us',
    },
    {
      route: 'help/develop',
      text: 'Accessibility',
    },
    {
      route: 'help/advertise',
      text: 'Advertise',
    },
    {
      route: 'help/privacy_policy',
      text: 'Contact Us',
    },
    {
      route: 'help/terms_of_service',
      text: 'Terms of Service',
    },
    {
      route: 'help/terms_of_sale',
      text: 'Terms of Sale',
    },
    {
      route: 'sitemap',
      text: 'Site Map',
    },
    {
      route: 'help/help',
      text: 'Help',
    },
    {
      route: 'subscription',
      text: 'Subscription',
    },
  ],
}