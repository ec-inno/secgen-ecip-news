/**
 * Inspired by https://usehooks.com/useScript
 */

import { useState, useEffect } from 'react';

const cachedScripts = [];

const useScript = src => {
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (cachedScripts.includes(src)) {
      return setState({
        loaded: true,
        error: false,
      });
    }

    cachedScripts.push(src);

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Script event listener callbacks for load and error
    const onScriptLoad = () => {
      return setState({
        loaded: true,
        error: false,
      });
    };

    const onScriptError = () => {
      const index = cachedScripts.indexOf(src);
      if (index >= 0) cachedScripts.splice(index, 1);
      script.remove();

      return setState({
        loaded: true,
        error: true,
      });
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [src]);

  return [state.loaded, state.error];
};

export default useScript;
