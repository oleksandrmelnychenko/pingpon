export abstract class EntityBase {
    public Id: number = 0;
    public NetUid: string;
    public Created: Date;
    public Updated: Date;
    public Deleted: boolean;
}