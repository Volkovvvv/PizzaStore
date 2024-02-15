import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={260}
    height={465}
    viewBox="0 0 260 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="125" cy="125" r="125" />
    <rect x="12" y="262" rx="13" ry="13" width="216" height="22" />
    <rect x="12" y="299" rx="23" ry="23" width="222" height="98" />
    <rect x="17" y="417" rx="13" ry="13" width="64" height="35" />
    <rect x="99" y="409" rx="13" ry="13" width="131" height="48" />
    <rect x="208" y="423" rx="0" ry="0" width="8" height="24" />
  </ContentLoader>
);

export default Skeleton;
