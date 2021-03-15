import { EntityBase } from "./entity.base";

export class UserProfile extends EntityBase {
    public DisplayName: string = '';

    public UserName: string = '';

    public Email: string = '';

    public IdentityRole: number = 103;

    public RoleDescription: string = '';

    public City: string = '';

}