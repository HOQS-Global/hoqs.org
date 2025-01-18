import { Link } from '@tanstack/react-router';
import { FormattedMessage } from 'react-intl';
import {Text} from '@hoqs/core-components';

export function Footer() {
  return (
    <footer className="grow flex flex-col justify-end w-full p-8 text-center">
      <Text variant="small" color="muted">
        <FormattedMessage id="footer.license-intro" />{' '}
        <Link to="/license" className="text-primary-500">
          <FormattedMessage id="footer.license" />
        </Link>
      </Text>
      <Text variant="small" color="muted" id="footer.creators" />
    </footer>
  );
}

export default Footer;
