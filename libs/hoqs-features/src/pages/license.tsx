
import { Link as LinkUI } from '@heroui/react';
import { PageContainer } from '@hoqs/core-components';
import { Link } from '@tanstack/react-router';

export const License = () => 
  <article className="prose dark:prose-invert mx-auto">
    <h1>Creative Commons</h1>
    <p>
      Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND
      4.0)
    </p>
    <LinkUI
      as={Link}
      isExternal
      anchorIcon
      to="https://creativecommons.org/licenses/by-nc-nd/4.0/"
    >
      https://creativecommons.org/licenses/by-nc-nd/4.0/
    </LinkUI>
    <p>You are free to:</p>
    <p>
      Share — copy and redistribute the material in any medium or format.
    </p>
    <p>
      The licensor cannot revoke these freedoms as long as you follow the
      license terms.
    </p>
    <p>Under the following terms:</p>
    <p>
      Attribution — You must give appropriate credit, provide a link to the
      license, and indicate if changes were made. You may do so in any
      reasonable manner, but not in any way that suggests the licensor
      endorses you or your use.
    </p>
    <p>
      NonCommercial — You may not use the material for commercial purposes.
    </p>
    <p>
      NoDerivatives — If you remix, transform, or build upon the material, you
      may not distribute the modified material.
    </p>
    <p>
      No additional restrictions — You may not apply legal terms or
      technological measures that legally restrict others from doing anything
      the license permits.
    </p>
    <p>Notices:</p>
    <p>
      You do not have to comply with the license for elements of the material
      in the public domain or where your use is permitted by an applicable
      exception or limitation.
    </p>
    <p>
      No warranties are given. The license may not give you all of the
      permissions necessary for your intended use. For example, other rights
      such as publicity, privacy, or moral rights may limit how you use the
      material.
    </p>
    <p>
      <LinkUI
        as={Link}
        isExternal
        anchorIcon
        to="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode"
      >
        https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
      </LinkUI>
      - More information available on the last pages. HOQS grants you
      permission to build up to 4 cabinets of each design for personal use, if
      building more than 4 or selling any number of cabinets you must contact
      your Regional Director for an exception via License or Subscription.
    </p>
    <p>
      Reach out and connect with your HOQS Regional Support Contact about
      various forms of support which include answering questions, sourcing
      drivers, parts & materials, also to have cabinets & systems built for
      you, or being added to your regional group chat on Facebook, and
      connecting with various other resources & specialists to meet your
      needs!
    </p>
    <p>
      Contact your regional HOQS director for license grants and exceptions.
    </p>
    <p>
      <LinkUI
        as={Link}
        isExternal
        anchorIcon
        to="https://www.hoqs.com.au/contact"
      >
        https://www.hoqs.com.au/contact
      </LinkUI>
    </p>
    <p>
      For More information visit the Introduction post link on facebook:{' '}
      <LinkUI
        as={Link}
        isExternal
        anchorIcon
        to="https://www.facebook.com/groups/bassaz/permalink/5927999007215177"
      >
        https://www.facebook.com/groups/bassaz/permalink/5927999007215177
      </LinkUI>
    </p>
    <p>
      HOQS PARAFLEX was founded in coordination with Matthew Morgan J, Dustin
      Morgan and J Vansickle then developed by The HOQS development community.
    </p>
  </article>

export default License;
