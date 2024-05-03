import type { Dictionary, MapCallback, MappingConfiguration } from '../types';
import { MappingCallbacksClassId, MappingClassId } from '../types';

export function afterMapArray<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    cb: MapCallback<TSource[], TDestination[]>
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        if (!mapping[MappingClassId.callbacks]) {
            mapping[MappingClassId.callbacks] = [];
        }
        mapping[MappingClassId.callbacks][MappingCallbacksClassId.afterMapArray] =
            cb;
    };
}
