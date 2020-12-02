import React, { useState, useEffect } from 'react';

export interface ITempMountedProps {
  children: any | any[];
  enabled: boolean;
  timeout?: number;
}

export function TempMounted(props: ITempMountedProps) {
  const { children, timeout, enabled } = props;

  const [isMounted, setMounted] = useState(true);

  useEffect(() => {
    setTimeout(() => setMounted(false), timeout || 100);
  }, []);

  if (!enabled || !isMounted) return null;

  return children;
}
