import React, { useState, useEffect } from 'react';

export interface IUseBeforeFirstRender {}

export function useBeforeFirstRender(f: () => any) {
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => setHasRendered(true), []);

  if (!hasRendered) f();
}
