import React from 'react';

// Shared figure embed — iframe stage with auto-sized height and
// scale-to-fit on narrow viewports.
//
// The figure HTML files are fluid down to roughly tablet width, but their
// diagrams (2×2 matrix, journey columns, before/after pairs) collide below
// `designWidth`. Rather than let those break on a phone, we render the iframe
// at a fixed design-width floor and proportionally scale the whole figure to
// fit the stage. The spatial layout is preserved exactly as on desktop, just
// smaller — which is the right trade-off for a positioning diagram.

export function Figure({ num, title, src, height = 920, minHeight = 720, designWidth = 760, showCaption = true }) {
  const stageRef = React.useRef(null);
  const iframeRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const [contentHeight, setContentHeight] = React.useState(height);

  const measure = React.useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument;
      if (doc && doc.body) {
        const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
        if (h && h > 200) setContentHeight(h);
      }
    } catch (e) { /* cross-origin — keep the fallback height */ }
  }, []);

  React.useEffect(() => {
    const stage = stageRef.current;
    const iframe = iframeRef.current;
    if (!stage || !iframe) return;

    const recompute = () => {
      const w = stage.clientWidth;
      setScale(w > 0 && w < designWidth ? w / designWidth : 1);
      // Re-measure after the new width/scale has been applied so the iframe's
      // own reflow (at designWidth) is reflected in the height.
      requestAnimationFrame(measure);
    };

    const onLoad = () => recompute();
    iframe.addEventListener('load', onLoad);
    const ro = new ResizeObserver(recompute);
    ro.observe(stage);
    recompute();

    return () => {
      iframe.removeEventListener('load', onLoad);
      ro.disconnect();
    };
  }, [designWidth, measure]);

  const scaled = scale < 1;
  const stageHeight = Math.max(contentHeight, minHeight) * scale;

  return (
    <figure className="figure" data-comment-anchor={`fig-${num}`}>
      <div className="figure-stage" ref={stageRef} style={{ height: stageHeight }}>
        <iframe
          ref={iframeRef}
          src={src}
          loading="lazy"
          title={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: scaled ? designWidth : '100%',
            maxWidth: 'none', // override `.figure-stage iframe { max-width: 100% }`
            height: Math.max(contentHeight, minHeight),
            transform: scaled ? `scale(${scale})` : 'none',
            transformOrigin: 'top left',
          }}
        />
      </div>
      {showCaption && (
        <figcaption className="figure-caption">
          {num != null && <span className="figure-num">Fig. {num}</span>}
          <span className="figure-title">{title}</span>
        </figcaption>
      )}
    </figure>
  );
}
