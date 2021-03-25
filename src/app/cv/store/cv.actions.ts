export class GetItems {
    public static readonly type = '[Cv] Get Items';

    constructor() { }
}

export class AddDetail {
    public static readonly type = '[Cv] Add Detail';

    constructor(public entryId: string) { }
}

export class RemoveDetail {
    public static readonly type = '[Cv] Remove Detail';

    constructor(public entryId: string) { }
}

export class SelectEntryId {
    public static readonly type = '[Cv] Select Entry Id';

    constructor(public entryId: string) { }
}
