import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  render(width: number, height: number): ReactNode;
}

export function Resizable(props: Props) {
  const { render } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState<{ width: number, height: number, loading: boolean }>({
    width: 0,
    height: 0,
    loading: true,
  });

  useLayoutEffect(() => {
    const refEl = ref.current;

    const resize = () => {
      const rect = refEl?.getBoundingClientRect();

      if (rect) {
        setDimensions({ width: rect.width, height: rect.height, loading: false });
      }
    }

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(refEl!);
    window.addEventListener('resize', resize, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize, true);
    }
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: dimensions.loading ? 0 : 1
      }}>
        {render(dimensions.width, dimensions.height)}
      </div>
    </div>
  );
}