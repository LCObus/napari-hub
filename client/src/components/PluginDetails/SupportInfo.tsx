import clsx from 'clsx';

import {
  GitHub,
  ProjectDocumentation,
  ProjectIssues,
  ProjectSite,
  ProjectSupport,
  Twitter,
} from '@/components/common/icons';
import { MediaFragment } from '@/components/common/media';
import { usePluginState } from '@/context/plugin';

import { MetadataList } from './MetadataList';
import { MetadataItem } from './PluginDetails.types';

/**
 * Extracts a Twitter's username from the given Twitter URL.  Regex copied
 * from: https://stackoverflow.com/a/5948248
 *
 * @param url Twitter URL
 * @returns Username from Twitter URL, or empty string if not found
 */
function formatTwitter(url: string): string {
  const match = /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?(?<name>[^/]+)(\/\w+)*$/.exec(
    url,
  );

  if (match) {
    return `@${String(match.groups?.name)}`;
  }

  return '';
}

interface CommonProps {
  /**
   * Class name to pass to root element.
   */
  className?: string;
}

interface SupportInfoBaseProps extends CommonProps {
  /**
   * Render the support info metadata list horizontally.
   */
  horizontal?: boolean;

  /**
   * Render the support info metadata list items inline.
   */
  inline?: boolean;
}

export function SupportInfoBase({
  className,
  horizontal,
  inline,
}: SupportInfoBaseProps) {
  const { plugin } = usePluginState();

  const items: MetadataItem[] = [
    {
      title: 'Authors',
      value: plugin.authors.map((author) => author.name),
    },

    {
      title: 'Learn more',
      value: [
        {
          href: plugin.project_site,
          icon: <ProjectSite />,
          text: 'Project site',
        },
        {
          href: plugin.documentation,
          icon: <ProjectDocumentation />,
          text: 'Documentation',
        },
        {
          href: plugin.support,
          icon: <ProjectSupport />,
          text: 'Support',
        },
        {
          href: plugin.report_issues,
          icon: <ProjectIssues />,
          text: 'Report issues',
        },
        {
          href: plugin.twitter,
          icon: <Twitter />,
          text: formatTwitter(plugin.twitter),
        },
      ].filter(
        // Filter out items if the link or text is empty
        (item) => item.href && item.text,
      ),
    },

    {
      title: 'Source code',
      value: plugin.code_repository && {
        href: plugin.code_repository,
        icon: <GitHub />,
        text: plugin.name,
      },
    },
  ];

  return (
    <MetadataList
      className={clsx('text-black bg-gray-100 p-5', className)}
      horizontal={horizontal}
      inline={inline}
      items={items}
    />
  );
}

/**
 * Component for rendering SupportInfoBase responsively.  This includes
 * rendering the metadata list horizontally for xl+ layouts and inline for
 * smaller layouts.
 */
export function SupportInfo(props: CommonProps) {
  return (
    <>
      <MediaFragment greaterThanOrEqual="xl">
        <SupportInfoBase {...props} horizontal />
      </MediaFragment>

      <MediaFragment lessThan="xl">
        <SupportInfoBase {...props} inline />
      </MediaFragment>
    </>
  );
}