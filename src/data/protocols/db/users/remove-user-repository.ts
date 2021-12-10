export interface RemoveUserRepository {
  remove: (id: string) => Promise<void>;
}
