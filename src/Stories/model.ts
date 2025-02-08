export interface ReactInstaStoriesProps {
    stories: Story[];
    width?: number | string;
    height?: number | string;
    header?: Function;
    storyContainerStyles?: Record<string, any>;
    storyInnerContainerStyles?: Record<string, any>;
    storyStyles?: Object;
    progressContainerStyles?: Object;
    progressWrapperStyles?: Object;
    progressStyles?: Object;
    loop?: boolean;
    defaultInterval?: number;
    isPaused?: boolean;
    currentIndex?: number;
    onAllStoriesEnd?: Function;
    onStoryStart?: Function;
    onStoryEnd?: Function;
    onNext?: Function;
    onPrevious?: Function;
    keyboardNavigation?: boolean;
    preventDefault?: boolean;
    preloadCount?: number;
}

export interface Story {
    url?: string;

    header?: Header;
    type?: string;
    duration?: number;
    styles?: object;
    preloadResource?: boolean;
    muted?: boolean;
}
export interface Header {
    heading: string;
    subheading: string;
    profileImage: string;
}

declare const ReactInstaStories: ({ width, height, defaultInterval, preloadCount, ...restProps }: ReactInstaStoriesProps) => JSX.Element;
