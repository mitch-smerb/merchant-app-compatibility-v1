import { emails, links } from '@shared/constants';
import ViewMyDemoLink from './components/ViewMyDemoLink';
import { ExternalLink } from './styles';

export const faqItems = [
  {
    title: 'How do you determine my audience size?',
    content:
      'We get transaction information from our network of banks and credit unions to identify active spending in your area. We work with you and your budget to target the consumers most likely to purchase with you.'
  },
  {
    title: 'Where do you get the sales and transaction information?',
    content:
      "We receive actual bank data from the financial institutions in our network. All personally identifying information is removed to protect the individual's data."
  },
  {
    title: 'What is the difference between overall spend and local spend?',
    content:
      'Overall is the total spending in your area. Local is spending at locally owned businesses.'
  },
  {
    title: 'What is considered “local”?',
    content:
      'Local can be a neighborhood, a region, or an online audience of people spending money that you could reasonably access.'
  },
  {
    title: 'How often is the information updated?',
    content:
      'The information is updated continuously based on the past 30 days.'
  },
  {
    title: 'Who do I contact for help or other questions?',
    content: [
      "If you have questions, suggestions, or other feedback, we'd love to hear from you. You can reach out to our support team at ",
      <ExternalLink href={`mailto:${emails.contactUs}`}>
        {emails.contactUs}
      </ExternalLink>,
      ' or ',
      <ExternalLink href={links.support}>
        schedule a call with a coach here
      </ExternalLink>,
      '.'
    ]
  },
  {
    title: 'Can I see what my audience sees in their bank app?',
    content: [
      'Yes. You can see what is shown in the digital banking screen ',
      <ViewMyDemoLink />,
      ' Or, request a personalized link by emailing us at ',
      <ExternalLink href={`mailto:${emails.contactUs}`}>
        {emails.contactUs}
      </ExternalLink>,
      '.'
    ]
  }
];
