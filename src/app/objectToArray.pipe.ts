import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'objectToArray'
})

export class ObjectToArray implements PipeTransform{
    transform(object: any = []): any{
        return Object.values(object);
    }
}