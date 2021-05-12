import { DanceClass } from "screens/classList/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";

export const useDanceClass = (param?: Partial<DanceClass>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<DanceClass[]>();

    useEffect(() => {
        run(client('classes', { data: cleanObject(param || []) }));
    }, [param])

    return result;
}