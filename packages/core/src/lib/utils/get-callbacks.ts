import { Dictionary, MapOptions, Mapping, MappingCallbacksClassId, MappingClassId } from "../types";

export function getBeforeAndAfterMap<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    mapping: Mapping<TSource, TDestination>,
    mapOptions?: MapOptions<TSource, TDestination>
): Pick<MapOptions<TSource, TDestination>, 'beforeMap' | 'afterMap' | 'extraArgs'> {
    const callbacks = mapping?.[MappingClassId.callbacks];
    const beforeMapCfg = callbacks?.[MappingCallbacksClassId.beforeMap];
    const afterMapCfg = callbacks?.[MappingCallbacksClassId.afterMap];

    const { beforeMap: beforeMapCb, afterMap: afterMapCb, extraArgs } =
        mapOptions || {};

    return {
        beforeMap: beforeMapCb || beforeMapCfg,
        afterMap: afterMapCb || afterMapCfg,
        extraArgs,
    };
}
