import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationsearch'
})
export class LocationsearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter((item: any) => {
      return item.district && item.district.toLowerCase().includes(args);
    });
  }

}
