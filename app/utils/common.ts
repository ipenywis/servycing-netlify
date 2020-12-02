import { UUID_ALL_VERSIONS_REGEX } from './regex';

export function delay(promise, time) {
  return promise.then(
    result => new Promise(resolve => setTimeout(() => resolve(result), time)),
  );
}

export function wait(time) {
  return new Promise(rs => setTimeout(rs, time));
}

export function createPortalContainer(id: string) {
  const portalContainer = document.getElementById(id);
  if (!portalContainer) {
    const popupPortalContainer = document.createElement('div');
    popupPortalContainer.id = id;
    document.body.appendChild(popupPortalContainer);
  }
}

export function isValidUUID(uuid: string): boolean {
  return UUID_ALL_VERSIONS_REGEX.test(uuid);
}

export function isEmptyObject(obj): boolean {
  if (obj && Object.keys(obj).length > 0) return false;
  else return true;
}
