import { Storage } from '@ionic/storage-angular';

export const storageMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
    set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
    get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
    remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
  })),
};
