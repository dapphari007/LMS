
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model approval_workflows
 * 
 */
export type approval_workflows = $Result.DefaultSelection<Prisma.$approval_workflowsPayload>
/**
 * Model departments
 * 
 */
export type departments = $Result.DefaultSelection<Prisma.$departmentsPayload>
/**
 * Model holidays
 * 
 */
export type holidays = $Result.DefaultSelection<Prisma.$holidaysPayload>
/**
 * Model leave_balances
 * 
 */
export type leave_balances = $Result.DefaultSelection<Prisma.$leave_balancesPayload>
/**
 * Model leave_requests
 * 
 */
export type leave_requests = $Result.DefaultSelection<Prisma.$leave_requestsPayload>
/**
 * Model leave_types
 * 
 */
export type leave_types = $Result.DefaultSelection<Prisma.$leave_typesPayload>
/**
 * Model migrations
 * 
 */
export type migrations = $Result.DefaultSelection<Prisma.$migrationsPayload>
/**
 * Model pages
 * 
 */
export type pages = $Result.DefaultSelection<Prisma.$pagesPayload>
/**
 * Model positions
 * 
 */
export type positions = $Result.DefaultSelection<Prisma.$positionsPayload>
/**
 * Model roles
 * 
 */
export type roles = $Result.DefaultSelection<Prisma.$rolesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const gender_enum: {
  male: 'male',
  female: 'female',
  other: 'other'
};

export type gender_enum = (typeof gender_enum)[keyof typeof gender_enum]


export const leave_request_status_enum: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  cancelled: 'cancelled',
  partially_approved: 'partially_approved',
  pending_deletion: 'pending_deletion'
};

export type leave_request_status_enum = (typeof leave_request_status_enum)[keyof typeof leave_request_status_enum]


export const leave_request_type_enum: {
  full_day: 'full_day',
  first_half: 'first_half',
  second_half: 'second_half'
};

export type leave_request_type_enum = (typeof leave_request_type_enum)[keyof typeof leave_request_type_enum]


export const user_level_enum: {
  level1: 'level1',
  level2: 'level2',
  level3: 'level3',
  level4: 'level4'
};

export type user_level_enum = (typeof user_level_enum)[keyof typeof user_level_enum]


export const user_role_enum: {
  super_admin: 'super_admin',
  hr: 'hr',
  manager: 'manager',
  team_lead: 'team_lead',
  employee: 'employee'
};

export type user_role_enum = (typeof user_role_enum)[keyof typeof user_role_enum]

}

export type gender_enum = $Enums.gender_enum

export const gender_enum: typeof $Enums.gender_enum

export type leave_request_status_enum = $Enums.leave_request_status_enum

export const leave_request_status_enum: typeof $Enums.leave_request_status_enum

export type leave_request_type_enum = $Enums.leave_request_type_enum

export const leave_request_type_enum: typeof $Enums.leave_request_type_enum

export type user_level_enum = $Enums.user_level_enum

export const user_level_enum: typeof $Enums.user_level_enum

export type user_role_enum = $Enums.user_role_enum

export const user_role_enum: typeof $Enums.user_role_enum

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Approval_workflows
 * const approval_workflows = await prisma.approval_workflows.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Approval_workflows
   * const approval_workflows = await prisma.approval_workflows.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.approval_workflows`: Exposes CRUD operations for the **approval_workflows** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Approval_workflows
    * const approval_workflows = await prisma.approval_workflows.findMany()
    * ```
    */
  get approval_workflows(): Prisma.approval_workflowsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.departments`: Exposes CRUD operations for the **departments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.departments.findMany()
    * ```
    */
  get departments(): Prisma.departmentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.holidays`: Exposes CRUD operations for the **holidays** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holidays
    * const holidays = await prisma.holidays.findMany()
    * ```
    */
  get holidays(): Prisma.holidaysDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leave_balances`: Exposes CRUD operations for the **leave_balances** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leave_balances
    * const leave_balances = await prisma.leave_balances.findMany()
    * ```
    */
  get leave_balances(): Prisma.leave_balancesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leave_requests`: Exposes CRUD operations for the **leave_requests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leave_requests
    * const leave_requests = await prisma.leave_requests.findMany()
    * ```
    */
  get leave_requests(): Prisma.leave_requestsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leave_types`: Exposes CRUD operations for the **leave_types** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leave_types
    * const leave_types = await prisma.leave_types.findMany()
    * ```
    */
  get leave_types(): Prisma.leave_typesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.migrations`: Exposes CRUD operations for the **migrations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Migrations
    * const migrations = await prisma.migrations.findMany()
    * ```
    */
  get migrations(): Prisma.migrationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pages`: Exposes CRUD operations for the **pages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.pages.findMany()
    * ```
    */
  get pages(): Prisma.pagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.positions`: Exposes CRUD operations for the **positions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Positions
    * const positions = await prisma.positions.findMany()
    * ```
    */
  get positions(): Prisma.positionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.rolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    approval_workflows: 'approval_workflows',
    departments: 'departments',
    holidays: 'holidays',
    leave_balances: 'leave_balances',
    leave_requests: 'leave_requests',
    leave_types: 'leave_types',
    migrations: 'migrations',
    pages: 'pages',
    positions: 'positions',
    roles: 'roles',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "approval_workflows" | "departments" | "holidays" | "leave_balances" | "leave_requests" | "leave_types" | "migrations" | "pages" | "positions" | "roles" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      approval_workflows: {
        payload: Prisma.$approval_workflowsPayload<ExtArgs>
        fields: Prisma.approval_workflowsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.approval_workflowsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.approval_workflowsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>
          }
          findFirst: {
            args: Prisma.approval_workflowsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.approval_workflowsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>
          }
          findMany: {
            args: Prisma.approval_workflowsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>[]
          }
          create: {
            args: Prisma.approval_workflowsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>
          }
          createMany: {
            args: Prisma.approval_workflowsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.approval_workflowsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>[]
          }
          delete: {
            args: Prisma.approval_workflowsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>
          }
          update: {
            args: Prisma.approval_workflowsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>
          }
          deleteMany: {
            args: Prisma.approval_workflowsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.approval_workflowsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.approval_workflowsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>[]
          }
          upsert: {
            args: Prisma.approval_workflowsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$approval_workflowsPayload>
          }
          aggregate: {
            args: Prisma.Approval_workflowsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApproval_workflows>
          }
          groupBy: {
            args: Prisma.approval_workflowsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Approval_workflowsGroupByOutputType>[]
          }
          count: {
            args: Prisma.approval_workflowsCountArgs<ExtArgs>
            result: $Utils.Optional<Approval_workflowsCountAggregateOutputType> | number
          }
        }
      }
      departments: {
        payload: Prisma.$departmentsPayload<ExtArgs>
        fields: Prisma.departmentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.departmentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.departmentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          findFirst: {
            args: Prisma.departmentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.departmentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          findMany: {
            args: Prisma.departmentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>[]
          }
          create: {
            args: Prisma.departmentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          createMany: {
            args: Prisma.departmentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.departmentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>[]
          }
          delete: {
            args: Prisma.departmentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          update: {
            args: Prisma.departmentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          deleteMany: {
            args: Prisma.departmentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.departmentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.departmentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>[]
          }
          upsert: {
            args: Prisma.departmentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentsPayload>
          }
          aggregate: {
            args: Prisma.DepartmentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartments>
          }
          groupBy: {
            args: Prisma.departmentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.departmentsCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentsCountAggregateOutputType> | number
          }
        }
      }
      holidays: {
        payload: Prisma.$holidaysPayload<ExtArgs>
        fields: Prisma.holidaysFieldRefs
        operations: {
          findUnique: {
            args: Prisma.holidaysFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.holidaysFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>
          }
          findFirst: {
            args: Prisma.holidaysFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.holidaysFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>
          }
          findMany: {
            args: Prisma.holidaysFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>[]
          }
          create: {
            args: Prisma.holidaysCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>
          }
          createMany: {
            args: Prisma.holidaysCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.holidaysCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>[]
          }
          delete: {
            args: Prisma.holidaysDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>
          }
          update: {
            args: Prisma.holidaysUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>
          }
          deleteMany: {
            args: Prisma.holidaysDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.holidaysUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.holidaysUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>[]
          }
          upsert: {
            args: Prisma.holidaysUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$holidaysPayload>
          }
          aggregate: {
            args: Prisma.HolidaysAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHolidays>
          }
          groupBy: {
            args: Prisma.holidaysGroupByArgs<ExtArgs>
            result: $Utils.Optional<HolidaysGroupByOutputType>[]
          }
          count: {
            args: Prisma.holidaysCountArgs<ExtArgs>
            result: $Utils.Optional<HolidaysCountAggregateOutputType> | number
          }
        }
      }
      leave_balances: {
        payload: Prisma.$leave_balancesPayload<ExtArgs>
        fields: Prisma.leave_balancesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.leave_balancesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.leave_balancesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          findFirst: {
            args: Prisma.leave_balancesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.leave_balancesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          findMany: {
            args: Prisma.leave_balancesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>[]
          }
          create: {
            args: Prisma.leave_balancesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          createMany: {
            args: Prisma.leave_balancesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.leave_balancesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>[]
          }
          delete: {
            args: Prisma.leave_balancesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          update: {
            args: Prisma.leave_balancesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          deleteMany: {
            args: Prisma.leave_balancesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.leave_balancesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.leave_balancesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>[]
          }
          upsert: {
            args: Prisma.leave_balancesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_balancesPayload>
          }
          aggregate: {
            args: Prisma.Leave_balancesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave_balances>
          }
          groupBy: {
            args: Prisma.leave_balancesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Leave_balancesGroupByOutputType>[]
          }
          count: {
            args: Prisma.leave_balancesCountArgs<ExtArgs>
            result: $Utils.Optional<Leave_balancesCountAggregateOutputType> | number
          }
        }
      }
      leave_requests: {
        payload: Prisma.$leave_requestsPayload<ExtArgs>
        fields: Prisma.leave_requestsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.leave_requestsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.leave_requestsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          findFirst: {
            args: Prisma.leave_requestsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.leave_requestsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          findMany: {
            args: Prisma.leave_requestsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>[]
          }
          create: {
            args: Prisma.leave_requestsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          createMany: {
            args: Prisma.leave_requestsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.leave_requestsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>[]
          }
          delete: {
            args: Prisma.leave_requestsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          update: {
            args: Prisma.leave_requestsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          deleteMany: {
            args: Prisma.leave_requestsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.leave_requestsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.leave_requestsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>[]
          }
          upsert: {
            args: Prisma.leave_requestsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_requestsPayload>
          }
          aggregate: {
            args: Prisma.Leave_requestsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave_requests>
          }
          groupBy: {
            args: Prisma.leave_requestsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Leave_requestsGroupByOutputType>[]
          }
          count: {
            args: Prisma.leave_requestsCountArgs<ExtArgs>
            result: $Utils.Optional<Leave_requestsCountAggregateOutputType> | number
          }
        }
      }
      leave_types: {
        payload: Prisma.$leave_typesPayload<ExtArgs>
        fields: Prisma.leave_typesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.leave_typesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.leave_typesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          findFirst: {
            args: Prisma.leave_typesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.leave_typesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          findMany: {
            args: Prisma.leave_typesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>[]
          }
          create: {
            args: Prisma.leave_typesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          createMany: {
            args: Prisma.leave_typesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.leave_typesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>[]
          }
          delete: {
            args: Prisma.leave_typesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          update: {
            args: Prisma.leave_typesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          deleteMany: {
            args: Prisma.leave_typesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.leave_typesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.leave_typesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>[]
          }
          upsert: {
            args: Prisma.leave_typesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$leave_typesPayload>
          }
          aggregate: {
            args: Prisma.Leave_typesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave_types>
          }
          groupBy: {
            args: Prisma.leave_typesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Leave_typesGroupByOutputType>[]
          }
          count: {
            args: Prisma.leave_typesCountArgs<ExtArgs>
            result: $Utils.Optional<Leave_typesCountAggregateOutputType> | number
          }
        }
      }
      migrations: {
        payload: Prisma.$migrationsPayload<ExtArgs>
        fields: Prisma.migrationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.migrationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.migrationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>
          }
          findFirst: {
            args: Prisma.migrationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.migrationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>
          }
          findMany: {
            args: Prisma.migrationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>[]
          }
          create: {
            args: Prisma.migrationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>
          }
          createMany: {
            args: Prisma.migrationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.migrationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>[]
          }
          delete: {
            args: Prisma.migrationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>
          }
          update: {
            args: Prisma.migrationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>
          }
          deleteMany: {
            args: Prisma.migrationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.migrationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.migrationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>[]
          }
          upsert: {
            args: Prisma.migrationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrationsPayload>
          }
          aggregate: {
            args: Prisma.MigrationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMigrations>
          }
          groupBy: {
            args: Prisma.migrationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MigrationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.migrationsCountArgs<ExtArgs>
            result: $Utils.Optional<MigrationsCountAggregateOutputType> | number
          }
        }
      }
      pages: {
        payload: Prisma.$pagesPayload<ExtArgs>
        fields: Prisma.pagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>
          }
          findFirst: {
            args: Prisma.pagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>
          }
          findMany: {
            args: Prisma.pagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>[]
          }
          create: {
            args: Prisma.pagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>
          }
          createMany: {
            args: Prisma.pagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.pagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>[]
          }
          delete: {
            args: Prisma.pagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>
          }
          update: {
            args: Prisma.pagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>
          }
          deleteMany: {
            args: Prisma.pagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.pagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>[]
          }
          upsert: {
            args: Prisma.pagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pagesPayload>
          }
          aggregate: {
            args: Prisma.PagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePages>
          }
          groupBy: {
            args: Prisma.pagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.pagesCountArgs<ExtArgs>
            result: $Utils.Optional<PagesCountAggregateOutputType> | number
          }
        }
      }
      positions: {
        payload: Prisma.$positionsPayload<ExtArgs>
        fields: Prisma.positionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.positionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.positionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>
          }
          findFirst: {
            args: Prisma.positionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.positionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>
          }
          findMany: {
            args: Prisma.positionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>[]
          }
          create: {
            args: Prisma.positionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>
          }
          createMany: {
            args: Prisma.positionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.positionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>[]
          }
          delete: {
            args: Prisma.positionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>
          }
          update: {
            args: Prisma.positionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>
          }
          deleteMany: {
            args: Prisma.positionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.positionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.positionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>[]
          }
          upsert: {
            args: Prisma.positionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$positionsPayload>
          }
          aggregate: {
            args: Prisma.PositionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePositions>
          }
          groupBy: {
            args: Prisma.positionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PositionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.positionsCountArgs<ExtArgs>
            result: $Utils.Optional<PositionsCountAggregateOutputType> | number
          }
        }
      }
      roles: {
        payload: Prisma.$rolesPayload<ExtArgs>
        fields: Prisma.rolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          findFirst: {
            args: Prisma.rolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          findMany: {
            args: Prisma.rolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          create: {
            args: Prisma.rolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          createMany: {
            args: Prisma.rolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          delete: {
            args: Prisma.rolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          update: {
            args: Prisma.rolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          deleteMany: {
            args: Prisma.rolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          upsert: {
            args: Prisma.rolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.rolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.rolesCountArgs<ExtArgs>
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    approval_workflows?: approval_workflowsOmit
    departments?: departmentsOmit
    holidays?: holidaysOmit
    leave_balances?: leave_balancesOmit
    leave_requests?: leave_requestsOmit
    leave_types?: leave_typesOmit
    migrations?: migrationsOmit
    pages?: pagesOmit
    positions?: positionsOmit
    roles?: rolesOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DepartmentsCountOutputType
   */

  export type DepartmentsCountOutputType = {
    positions: number
    users_users_departmentIdTodepartments: number
  }

  export type DepartmentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    positions?: boolean | DepartmentsCountOutputTypeCountPositionsArgs
    users_users_departmentIdTodepartments?: boolean | DepartmentsCountOutputTypeCountUsers_users_departmentIdTodepartmentsArgs
  }

  // Custom InputTypes
  /**
   * DepartmentsCountOutputType without action
   */
  export type DepartmentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentsCountOutputType
     */
    select?: DepartmentsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentsCountOutputType without action
   */
  export type DepartmentsCountOutputTypeCountPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: positionsWhereInput
  }

  /**
   * DepartmentsCountOutputType without action
   */
  export type DepartmentsCountOutputTypeCountUsers_users_departmentIdTodepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type Leave_typesCountOutputType
   */

  export type Leave_typesCountOutputType = {
    leave_balances: number
    leave_requests: number
  }

  export type Leave_typesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_balances?: boolean | Leave_typesCountOutputTypeCountLeave_balancesArgs
    leave_requests?: boolean | Leave_typesCountOutputTypeCountLeave_requestsArgs
  }

  // Custom InputTypes
  /**
   * Leave_typesCountOutputType without action
   */
  export type Leave_typesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave_typesCountOutputType
     */
    select?: Leave_typesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Leave_typesCountOutputType without action
   */
  export type Leave_typesCountOutputTypeCountLeave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_balancesWhereInput
  }

  /**
   * Leave_typesCountOutputType without action
   */
  export type Leave_typesCountOutputTypeCountLeave_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
  }


  /**
   * Count Type PositionsCountOutputType
   */

  export type PositionsCountOutputType = {
    users: number
  }

  export type PositionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | PositionsCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * PositionsCountOutputType without action
   */
  export type PositionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PositionsCountOutputType
     */
    select?: PositionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PositionsCountOutputType without action
   */
  export type PositionsCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type RolesCountOutputType
   */

  export type RolesCountOutputType = {
    users: number
  }

  export type RolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RolesCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolesCountOutputType
     */
    select?: RolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    departments_departments_managerIdTousers: number
    leave_balances: number
    leave_requests_leave_requests_approverIdTousers: number
    leave_requests_leave_requests_userIdTousers: number
    other_users_users_hrIdTousers: number
    other_users_users_managerIdTousers: number
    other_users_users_teamLeadIdTousers: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments_departments_managerIdTousers?: boolean | UsersCountOutputTypeCountDepartments_departments_managerIdTousersArgs
    leave_balances?: boolean | UsersCountOutputTypeCountLeave_balancesArgs
    leave_requests_leave_requests_approverIdTousers?: boolean | UsersCountOutputTypeCountLeave_requests_leave_requests_approverIdTousersArgs
    leave_requests_leave_requests_userIdTousers?: boolean | UsersCountOutputTypeCountLeave_requests_leave_requests_userIdTousersArgs
    other_users_users_hrIdTousers?: boolean | UsersCountOutputTypeCountOther_users_users_hrIdTousersArgs
    other_users_users_managerIdTousers?: boolean | UsersCountOutputTypeCountOther_users_users_managerIdTousersArgs
    other_users_users_teamLeadIdTousers?: boolean | UsersCountOutputTypeCountOther_users_users_teamLeadIdTousersArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountDepartments_departments_managerIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: departmentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLeave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_balancesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLeave_requests_leave_requests_approverIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLeave_requests_leave_requests_userIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountOther_users_users_hrIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountOther_users_users_managerIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountOther_users_users_teamLeadIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Models
   */

  /**
   * Model approval_workflows
   */

  export type AggregateApproval_workflows = {
    _count: Approval_workflowsCountAggregateOutputType | null
    _avg: Approval_workflowsAvgAggregateOutputType | null
    _sum: Approval_workflowsSumAggregateOutputType | null
    _min: Approval_workflowsMinAggregateOutputType | null
    _max: Approval_workflowsMaxAggregateOutputType | null
  }

  export type Approval_workflowsAvgAggregateOutputType = {
    minDays: number | null
    maxDays: number | null
  }

  export type Approval_workflowsSumAggregateOutputType = {
    minDays: number | null
    maxDays: number | null
  }

  export type Approval_workflowsMinAggregateOutputType = {
    id: string | null
    name: string | null
    minDays: number | null
    maxDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Approval_workflowsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    minDays: number | null
    maxDays: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Approval_workflowsCountAggregateOutputType = {
    id: number
    name: number
    minDays: number
    maxDays: number
    approvalLevels: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Approval_workflowsAvgAggregateInputType = {
    minDays?: true
    maxDays?: true
  }

  export type Approval_workflowsSumAggregateInputType = {
    minDays?: true
    maxDays?: true
  }

  export type Approval_workflowsMinAggregateInputType = {
    id?: true
    name?: true
    minDays?: true
    maxDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Approval_workflowsMaxAggregateInputType = {
    id?: true
    name?: true
    minDays?: true
    maxDays?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Approval_workflowsCountAggregateInputType = {
    id?: true
    name?: true
    minDays?: true
    maxDays?: true
    approvalLevels?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Approval_workflowsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which approval_workflows to aggregate.
     */
    where?: approval_workflowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of approval_workflows to fetch.
     */
    orderBy?: approval_workflowsOrderByWithRelationInput | approval_workflowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: approval_workflowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` approval_workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` approval_workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned approval_workflows
    **/
    _count?: true | Approval_workflowsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Approval_workflowsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Approval_workflowsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Approval_workflowsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Approval_workflowsMaxAggregateInputType
  }

  export type GetApproval_workflowsAggregateType<T extends Approval_workflowsAggregateArgs> = {
        [P in keyof T & keyof AggregateApproval_workflows]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApproval_workflows[P]>
      : GetScalarType<T[P], AggregateApproval_workflows[P]>
  }




  export type approval_workflowsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: approval_workflowsWhereInput
    orderBy?: approval_workflowsOrderByWithAggregationInput | approval_workflowsOrderByWithAggregationInput[]
    by: Approval_workflowsScalarFieldEnum[] | Approval_workflowsScalarFieldEnum
    having?: approval_workflowsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Approval_workflowsCountAggregateInputType | true
    _avg?: Approval_workflowsAvgAggregateInputType
    _sum?: Approval_workflowsSumAggregateInputType
    _min?: Approval_workflowsMinAggregateInputType
    _max?: Approval_workflowsMaxAggregateInputType
  }

  export type Approval_workflowsGroupByOutputType = {
    id: string
    name: string
    minDays: number
    maxDays: number
    approvalLevels: JsonValue
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: Approval_workflowsCountAggregateOutputType | null
    _avg: Approval_workflowsAvgAggregateOutputType | null
    _sum: Approval_workflowsSumAggregateOutputType | null
    _min: Approval_workflowsMinAggregateOutputType | null
    _max: Approval_workflowsMaxAggregateOutputType | null
  }

  type GetApproval_workflowsGroupByPayload<T extends approval_workflowsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Approval_workflowsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Approval_workflowsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Approval_workflowsGroupByOutputType[P]>
            : GetScalarType<T[P], Approval_workflowsGroupByOutputType[P]>
        }
      >
    >


  export type approval_workflowsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    minDays?: boolean
    maxDays?: boolean
    approvalLevels?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["approval_workflows"]>

  export type approval_workflowsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    minDays?: boolean
    maxDays?: boolean
    approvalLevels?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["approval_workflows"]>

  export type approval_workflowsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    minDays?: boolean
    maxDays?: boolean
    approvalLevels?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["approval_workflows"]>

  export type approval_workflowsSelectScalar = {
    id?: boolean
    name?: boolean
    minDays?: boolean
    maxDays?: boolean
    approvalLevels?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type approval_workflowsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "minDays" | "maxDays" | "approvalLevels" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["approval_workflows"]>

  export type $approval_workflowsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "approval_workflows"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      minDays: number
      maxDays: number
      approvalLevels: Prisma.JsonValue
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["approval_workflows"]>
    composites: {}
  }

  type approval_workflowsGetPayload<S extends boolean | null | undefined | approval_workflowsDefaultArgs> = $Result.GetResult<Prisma.$approval_workflowsPayload, S>

  type approval_workflowsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<approval_workflowsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Approval_workflowsCountAggregateInputType | true
    }

  export interface approval_workflowsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['approval_workflows'], meta: { name: 'approval_workflows' } }
    /**
     * Find zero or one Approval_workflows that matches the filter.
     * @param {approval_workflowsFindUniqueArgs} args - Arguments to find a Approval_workflows
     * @example
     * // Get one Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends approval_workflowsFindUniqueArgs>(args: SelectSubset<T, approval_workflowsFindUniqueArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Approval_workflows that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {approval_workflowsFindUniqueOrThrowArgs} args - Arguments to find a Approval_workflows
     * @example
     * // Get one Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends approval_workflowsFindUniqueOrThrowArgs>(args: SelectSubset<T, approval_workflowsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approval_workflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {approval_workflowsFindFirstArgs} args - Arguments to find a Approval_workflows
     * @example
     * // Get one Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends approval_workflowsFindFirstArgs>(args?: SelectSubset<T, approval_workflowsFindFirstArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Approval_workflows that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {approval_workflowsFindFirstOrThrowArgs} args - Arguments to find a Approval_workflows
     * @example
     * // Get one Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends approval_workflowsFindFirstOrThrowArgs>(args?: SelectSubset<T, approval_workflowsFindFirstOrThrowArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Approval_workflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {approval_workflowsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.findMany()
     * 
     * // Get first 10 Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const approval_workflowsWithIdOnly = await prisma.approval_workflows.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends approval_workflowsFindManyArgs>(args?: SelectSubset<T, approval_workflowsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Approval_workflows.
     * @param {approval_workflowsCreateArgs} args - Arguments to create a Approval_workflows.
     * @example
     * // Create one Approval_workflows
     * const Approval_workflows = await prisma.approval_workflows.create({
     *   data: {
     *     // ... data to create a Approval_workflows
     *   }
     * })
     * 
     */
    create<T extends approval_workflowsCreateArgs>(args: SelectSubset<T, approval_workflowsCreateArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Approval_workflows.
     * @param {approval_workflowsCreateManyArgs} args - Arguments to create many Approval_workflows.
     * @example
     * // Create many Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends approval_workflowsCreateManyArgs>(args?: SelectSubset<T, approval_workflowsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Approval_workflows and returns the data saved in the database.
     * @param {approval_workflowsCreateManyAndReturnArgs} args - Arguments to create many Approval_workflows.
     * @example
     * // Create many Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Approval_workflows and only return the `id`
     * const approval_workflowsWithIdOnly = await prisma.approval_workflows.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends approval_workflowsCreateManyAndReturnArgs>(args?: SelectSubset<T, approval_workflowsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Approval_workflows.
     * @param {approval_workflowsDeleteArgs} args - Arguments to delete one Approval_workflows.
     * @example
     * // Delete one Approval_workflows
     * const Approval_workflows = await prisma.approval_workflows.delete({
     *   where: {
     *     // ... filter to delete one Approval_workflows
     *   }
     * })
     * 
     */
    delete<T extends approval_workflowsDeleteArgs>(args: SelectSubset<T, approval_workflowsDeleteArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Approval_workflows.
     * @param {approval_workflowsUpdateArgs} args - Arguments to update one Approval_workflows.
     * @example
     * // Update one Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends approval_workflowsUpdateArgs>(args: SelectSubset<T, approval_workflowsUpdateArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Approval_workflows.
     * @param {approval_workflowsDeleteManyArgs} args - Arguments to filter Approval_workflows to delete.
     * @example
     * // Delete a few Approval_workflows
     * const { count } = await prisma.approval_workflows.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends approval_workflowsDeleteManyArgs>(args?: SelectSubset<T, approval_workflowsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approval_workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {approval_workflowsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends approval_workflowsUpdateManyArgs>(args: SelectSubset<T, approval_workflowsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Approval_workflows and returns the data updated in the database.
     * @param {approval_workflowsUpdateManyAndReturnArgs} args - Arguments to update many Approval_workflows.
     * @example
     * // Update many Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Approval_workflows and only return the `id`
     * const approval_workflowsWithIdOnly = await prisma.approval_workflows.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends approval_workflowsUpdateManyAndReturnArgs>(args: SelectSubset<T, approval_workflowsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Approval_workflows.
     * @param {approval_workflowsUpsertArgs} args - Arguments to update or create a Approval_workflows.
     * @example
     * // Update or create a Approval_workflows
     * const approval_workflows = await prisma.approval_workflows.upsert({
     *   create: {
     *     // ... data to create a Approval_workflows
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Approval_workflows we want to update
     *   }
     * })
     */
    upsert<T extends approval_workflowsUpsertArgs>(args: SelectSubset<T, approval_workflowsUpsertArgs<ExtArgs>>): Prisma__approval_workflowsClient<$Result.GetResult<Prisma.$approval_workflowsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Approval_workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {approval_workflowsCountArgs} args - Arguments to filter Approval_workflows to count.
     * @example
     * // Count the number of Approval_workflows
     * const count = await prisma.approval_workflows.count({
     *   where: {
     *     // ... the filter for the Approval_workflows we want to count
     *   }
     * })
    **/
    count<T extends approval_workflowsCountArgs>(
      args?: Subset<T, approval_workflowsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Approval_workflowsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Approval_workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Approval_workflowsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Approval_workflowsAggregateArgs>(args: Subset<T, Approval_workflowsAggregateArgs>): Prisma.PrismaPromise<GetApproval_workflowsAggregateType<T>>

    /**
     * Group by Approval_workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {approval_workflowsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends approval_workflowsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: approval_workflowsGroupByArgs['orderBy'] }
        : { orderBy?: approval_workflowsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, approval_workflowsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApproval_workflowsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the approval_workflows model
   */
  readonly fields: approval_workflowsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for approval_workflows.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__approval_workflowsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the approval_workflows model
   */
  interface approval_workflowsFieldRefs {
    readonly id: FieldRef<"approval_workflows", 'String'>
    readonly name: FieldRef<"approval_workflows", 'String'>
    readonly minDays: FieldRef<"approval_workflows", 'Float'>
    readonly maxDays: FieldRef<"approval_workflows", 'Float'>
    readonly approvalLevels: FieldRef<"approval_workflows", 'Json'>
    readonly isActive: FieldRef<"approval_workflows", 'Boolean'>
    readonly createdAt: FieldRef<"approval_workflows", 'DateTime'>
    readonly updatedAt: FieldRef<"approval_workflows", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * approval_workflows findUnique
   */
  export type approval_workflowsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * Filter, which approval_workflows to fetch.
     */
    where: approval_workflowsWhereUniqueInput
  }

  /**
   * approval_workflows findUniqueOrThrow
   */
  export type approval_workflowsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * Filter, which approval_workflows to fetch.
     */
    where: approval_workflowsWhereUniqueInput
  }

  /**
   * approval_workflows findFirst
   */
  export type approval_workflowsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * Filter, which approval_workflows to fetch.
     */
    where?: approval_workflowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of approval_workflows to fetch.
     */
    orderBy?: approval_workflowsOrderByWithRelationInput | approval_workflowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for approval_workflows.
     */
    cursor?: approval_workflowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` approval_workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` approval_workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of approval_workflows.
     */
    distinct?: Approval_workflowsScalarFieldEnum | Approval_workflowsScalarFieldEnum[]
  }

  /**
   * approval_workflows findFirstOrThrow
   */
  export type approval_workflowsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * Filter, which approval_workflows to fetch.
     */
    where?: approval_workflowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of approval_workflows to fetch.
     */
    orderBy?: approval_workflowsOrderByWithRelationInput | approval_workflowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for approval_workflows.
     */
    cursor?: approval_workflowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` approval_workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` approval_workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of approval_workflows.
     */
    distinct?: Approval_workflowsScalarFieldEnum | Approval_workflowsScalarFieldEnum[]
  }

  /**
   * approval_workflows findMany
   */
  export type approval_workflowsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * Filter, which approval_workflows to fetch.
     */
    where?: approval_workflowsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of approval_workflows to fetch.
     */
    orderBy?: approval_workflowsOrderByWithRelationInput | approval_workflowsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing approval_workflows.
     */
    cursor?: approval_workflowsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` approval_workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` approval_workflows.
     */
    skip?: number
    distinct?: Approval_workflowsScalarFieldEnum | Approval_workflowsScalarFieldEnum[]
  }

  /**
   * approval_workflows create
   */
  export type approval_workflowsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * The data needed to create a approval_workflows.
     */
    data: XOR<approval_workflowsCreateInput, approval_workflowsUncheckedCreateInput>
  }

  /**
   * approval_workflows createMany
   */
  export type approval_workflowsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many approval_workflows.
     */
    data: approval_workflowsCreateManyInput | approval_workflowsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * approval_workflows createManyAndReturn
   */
  export type approval_workflowsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * The data used to create many approval_workflows.
     */
    data: approval_workflowsCreateManyInput | approval_workflowsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * approval_workflows update
   */
  export type approval_workflowsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * The data needed to update a approval_workflows.
     */
    data: XOR<approval_workflowsUpdateInput, approval_workflowsUncheckedUpdateInput>
    /**
     * Choose, which approval_workflows to update.
     */
    where: approval_workflowsWhereUniqueInput
  }

  /**
   * approval_workflows updateMany
   */
  export type approval_workflowsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update approval_workflows.
     */
    data: XOR<approval_workflowsUpdateManyMutationInput, approval_workflowsUncheckedUpdateManyInput>
    /**
     * Filter which approval_workflows to update
     */
    where?: approval_workflowsWhereInput
    /**
     * Limit how many approval_workflows to update.
     */
    limit?: number
  }

  /**
   * approval_workflows updateManyAndReturn
   */
  export type approval_workflowsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * The data used to update approval_workflows.
     */
    data: XOR<approval_workflowsUpdateManyMutationInput, approval_workflowsUncheckedUpdateManyInput>
    /**
     * Filter which approval_workflows to update
     */
    where?: approval_workflowsWhereInput
    /**
     * Limit how many approval_workflows to update.
     */
    limit?: number
  }

  /**
   * approval_workflows upsert
   */
  export type approval_workflowsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * The filter to search for the approval_workflows to update in case it exists.
     */
    where: approval_workflowsWhereUniqueInput
    /**
     * In case the approval_workflows found by the `where` argument doesn't exist, create a new approval_workflows with this data.
     */
    create: XOR<approval_workflowsCreateInput, approval_workflowsUncheckedCreateInput>
    /**
     * In case the approval_workflows was found with the provided `where` argument, update it with this data.
     */
    update: XOR<approval_workflowsUpdateInput, approval_workflowsUncheckedUpdateInput>
  }

  /**
   * approval_workflows delete
   */
  export type approval_workflowsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
    /**
     * Filter which approval_workflows to delete.
     */
    where: approval_workflowsWhereUniqueInput
  }

  /**
   * approval_workflows deleteMany
   */
  export type approval_workflowsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which approval_workflows to delete
     */
    where?: approval_workflowsWhereInput
    /**
     * Limit how many approval_workflows to delete.
     */
    limit?: number
  }

  /**
   * approval_workflows without action
   */
  export type approval_workflowsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the approval_workflows
     */
    select?: approval_workflowsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the approval_workflows
     */
    omit?: approval_workflowsOmit<ExtArgs> | null
  }


  /**
   * Model departments
   */

  export type AggregateDepartments = {
    _count: DepartmentsCountAggregateOutputType | null
    _min: DepartmentsMinAggregateOutputType | null
    _max: DepartmentsMaxAggregateOutputType | null
  }

  export type DepartmentsMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    managerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    managerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentsCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    managerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DepartmentsMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    managerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentsMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    managerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentsCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    managerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DepartmentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departments to aggregate.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned departments
    **/
    _count?: true | DepartmentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentsMaxAggregateInputType
  }

  export type GetDepartmentsAggregateType<T extends DepartmentsAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartments[P]>
      : GetScalarType<T[P], AggregateDepartments[P]>
  }




  export type departmentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: departmentsWhereInput
    orderBy?: departmentsOrderByWithAggregationInput | departmentsOrderByWithAggregationInput[]
    by: DepartmentsScalarFieldEnum[] | DepartmentsScalarFieldEnum
    having?: departmentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentsCountAggregateInputType | true
    _min?: DepartmentsMinAggregateInputType
    _max?: DepartmentsMaxAggregateInputType
  }

  export type DepartmentsGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    managerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: DepartmentsCountAggregateOutputType | null
    _min: DepartmentsMinAggregateOutputType | null
    _max: DepartmentsMaxAggregateOutputType | null
  }

  type GetDepartmentsGroupByPayload<T extends departmentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentsGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentsGroupByOutputType[P]>
        }
      >
    >


  export type departmentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    managerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users_departments_managerIdTousers?: boolean | departments$users_departments_managerIdTousersArgs<ExtArgs>
    positions?: boolean | departments$positionsArgs<ExtArgs>
    users_users_departmentIdTodepartments?: boolean | departments$users_users_departmentIdTodepartmentsArgs<ExtArgs>
    _count?: boolean | DepartmentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["departments"]>

  export type departmentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    managerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users_departments_managerIdTousers?: boolean | departments$users_departments_managerIdTousersArgs<ExtArgs>
  }, ExtArgs["result"]["departments"]>

  export type departmentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    managerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users_departments_managerIdTousers?: boolean | departments$users_departments_managerIdTousersArgs<ExtArgs>
  }, ExtArgs["result"]["departments"]>

  export type departmentsSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    managerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type departmentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "managerId" | "createdAt" | "updatedAt", ExtArgs["result"]["departments"]>
  export type departmentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_departments_managerIdTousers?: boolean | departments$users_departments_managerIdTousersArgs<ExtArgs>
    positions?: boolean | departments$positionsArgs<ExtArgs>
    users_users_departmentIdTodepartments?: boolean | departments$users_users_departmentIdTodepartmentsArgs<ExtArgs>
    _count?: boolean | DepartmentsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type departmentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_departments_managerIdTousers?: boolean | departments$users_departments_managerIdTousersArgs<ExtArgs>
  }
  export type departmentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_departments_managerIdTousers?: boolean | departments$users_departments_managerIdTousersArgs<ExtArgs>
  }

  export type $departmentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "departments"
    objects: {
      users_departments_managerIdTousers: Prisma.$usersPayload<ExtArgs> | null
      positions: Prisma.$positionsPayload<ExtArgs>[]
      users_users_departmentIdTodepartments: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      managerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["departments"]>
    composites: {}
  }

  type departmentsGetPayload<S extends boolean | null | undefined | departmentsDefaultArgs> = $Result.GetResult<Prisma.$departmentsPayload, S>

  type departmentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<departmentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentsCountAggregateInputType | true
    }

  export interface departmentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['departments'], meta: { name: 'departments' } }
    /**
     * Find zero or one Departments that matches the filter.
     * @param {departmentsFindUniqueArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends departmentsFindUniqueArgs>(args: SelectSubset<T, departmentsFindUniqueArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Departments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {departmentsFindUniqueOrThrowArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends departmentsFindUniqueOrThrowArgs>(args: SelectSubset<T, departmentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsFindFirstArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends departmentsFindFirstArgs>(args?: SelectSubset<T, departmentsFindFirstArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Departments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsFindFirstOrThrowArgs} args - Arguments to find a Departments
     * @example
     * // Get one Departments
     * const departments = await prisma.departments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends departmentsFindFirstOrThrowArgs>(args?: SelectSubset<T, departmentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.departments.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.departments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentsWithIdOnly = await prisma.departments.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends departmentsFindManyArgs>(args?: SelectSubset<T, departmentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Departments.
     * @param {departmentsCreateArgs} args - Arguments to create a Departments.
     * @example
     * // Create one Departments
     * const Departments = await prisma.departments.create({
     *   data: {
     *     // ... data to create a Departments
     *   }
     * })
     * 
     */
    create<T extends departmentsCreateArgs>(args: SelectSubset<T, departmentsCreateArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {departmentsCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const departments = await prisma.departments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends departmentsCreateManyArgs>(args?: SelectSubset<T, departmentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {departmentsCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const departments = await prisma.departments.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentsWithIdOnly = await prisma.departments.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends departmentsCreateManyAndReturnArgs>(args?: SelectSubset<T, departmentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Departments.
     * @param {departmentsDeleteArgs} args - Arguments to delete one Departments.
     * @example
     * // Delete one Departments
     * const Departments = await prisma.departments.delete({
     *   where: {
     *     // ... filter to delete one Departments
     *   }
     * })
     * 
     */
    delete<T extends departmentsDeleteArgs>(args: SelectSubset<T, departmentsDeleteArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Departments.
     * @param {departmentsUpdateArgs} args - Arguments to update one Departments.
     * @example
     * // Update one Departments
     * const departments = await prisma.departments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends departmentsUpdateArgs>(args: SelectSubset<T, departmentsUpdateArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {departmentsDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.departments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends departmentsDeleteManyArgs>(args?: SelectSubset<T, departmentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const departments = await prisma.departments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends departmentsUpdateManyArgs>(args: SelectSubset<T, departmentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {departmentsUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const departments = await prisma.departments.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentsWithIdOnly = await prisma.departments.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends departmentsUpdateManyAndReturnArgs>(args: SelectSubset<T, departmentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Departments.
     * @param {departmentsUpsertArgs} args - Arguments to update or create a Departments.
     * @example
     * // Update or create a Departments
     * const departments = await prisma.departments.upsert({
     *   create: {
     *     // ... data to create a Departments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Departments we want to update
     *   }
     * })
     */
    upsert<T extends departmentsUpsertArgs>(args: SelectSubset<T, departmentsUpsertArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.departments.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends departmentsCountArgs>(
      args?: Subset<T, departmentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentsAggregateArgs>(args: Subset<T, DepartmentsAggregateArgs>): Prisma.PrismaPromise<GetDepartmentsAggregateType<T>>

    /**
     * Group by Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends departmentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: departmentsGroupByArgs['orderBy'] }
        : { orderBy?: departmentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, departmentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the departments model
   */
  readonly fields: departmentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for departments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__departmentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_departments_managerIdTousers<T extends departments$users_departments_managerIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, departments$users_departments_managerIdTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    positions<T extends departments$positionsArgs<ExtArgs> = {}>(args?: Subset<T, departments$positionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_users_departmentIdTodepartments<T extends departments$users_users_departmentIdTodepartmentsArgs<ExtArgs> = {}>(args?: Subset<T, departments$users_users_departmentIdTodepartmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the departments model
   */
  interface departmentsFieldRefs {
    readonly id: FieldRef<"departments", 'String'>
    readonly name: FieldRef<"departments", 'String'>
    readonly description: FieldRef<"departments", 'String'>
    readonly isActive: FieldRef<"departments", 'Boolean'>
    readonly managerId: FieldRef<"departments", 'String'>
    readonly createdAt: FieldRef<"departments", 'DateTime'>
    readonly updatedAt: FieldRef<"departments", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * departments findUnique
   */
  export type departmentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where: departmentsWhereUniqueInput
  }

  /**
   * departments findUniqueOrThrow
   */
  export type departmentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where: departmentsWhereUniqueInput
  }

  /**
   * departments findFirst
   */
  export type departmentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departments.
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departments.
     */
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }

  /**
   * departments findFirstOrThrow
   */
  export type departmentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departments.
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departments.
     */
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }

  /**
   * departments findMany
   */
  export type departmentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing departments.
     */
    cursor?: departmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }

  /**
   * departments create
   */
  export type departmentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * The data needed to create a departments.
     */
    data: XOR<departmentsCreateInput, departmentsUncheckedCreateInput>
  }

  /**
   * departments createMany
   */
  export type departmentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many departments.
     */
    data: departmentsCreateManyInput | departmentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * departments createManyAndReturn
   */
  export type departmentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * The data used to create many departments.
     */
    data: departmentsCreateManyInput | departmentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * departments update
   */
  export type departmentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * The data needed to update a departments.
     */
    data: XOR<departmentsUpdateInput, departmentsUncheckedUpdateInput>
    /**
     * Choose, which departments to update.
     */
    where: departmentsWhereUniqueInput
  }

  /**
   * departments updateMany
   */
  export type departmentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update departments.
     */
    data: XOR<departmentsUpdateManyMutationInput, departmentsUncheckedUpdateManyInput>
    /**
     * Filter which departments to update
     */
    where?: departmentsWhereInput
    /**
     * Limit how many departments to update.
     */
    limit?: number
  }

  /**
   * departments updateManyAndReturn
   */
  export type departmentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * The data used to update departments.
     */
    data: XOR<departmentsUpdateManyMutationInput, departmentsUncheckedUpdateManyInput>
    /**
     * Filter which departments to update
     */
    where?: departmentsWhereInput
    /**
     * Limit how many departments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * departments upsert
   */
  export type departmentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * The filter to search for the departments to update in case it exists.
     */
    where: departmentsWhereUniqueInput
    /**
     * In case the departments found by the `where` argument doesn't exist, create a new departments with this data.
     */
    create: XOR<departmentsCreateInput, departmentsUncheckedCreateInput>
    /**
     * In case the departments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<departmentsUpdateInput, departmentsUncheckedUpdateInput>
  }

  /**
   * departments delete
   */
  export type departmentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    /**
     * Filter which departments to delete.
     */
    where: departmentsWhereUniqueInput
  }

  /**
   * departments deleteMany
   */
  export type departmentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departments to delete
     */
    where?: departmentsWhereInput
    /**
     * Limit how many departments to delete.
     */
    limit?: number
  }

  /**
   * departments.users_departments_managerIdTousers
   */
  export type departments$users_departments_managerIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * departments.positions
   */
  export type departments$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    where?: positionsWhereInput
    orderBy?: positionsOrderByWithRelationInput | positionsOrderByWithRelationInput[]
    cursor?: positionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PositionsScalarFieldEnum | PositionsScalarFieldEnum[]
  }

  /**
   * departments.users_users_departmentIdTodepartments
   */
  export type departments$users_users_departmentIdTodepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * departments without action
   */
  export type departmentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
  }


  /**
   * Model holidays
   */

  export type AggregateHolidays = {
    _count: HolidaysCountAggregateOutputType | null
    _min: HolidaysMinAggregateOutputType | null
    _max: HolidaysMaxAggregateOutputType | null
  }

  export type HolidaysMinAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HolidaysMaxAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HolidaysCountAggregateOutputType = {
    id: number
    name: number
    date: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HolidaysMinAggregateInputType = {
    id?: true
    name?: true
    date?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HolidaysMaxAggregateInputType = {
    id?: true
    name?: true
    date?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HolidaysCountAggregateInputType = {
    id?: true
    name?: true
    date?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HolidaysAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which holidays to aggregate.
     */
    where?: holidaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of holidays to fetch.
     */
    orderBy?: holidaysOrderByWithRelationInput | holidaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: holidaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` holidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned holidays
    **/
    _count?: true | HolidaysCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HolidaysMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HolidaysMaxAggregateInputType
  }

  export type GetHolidaysAggregateType<T extends HolidaysAggregateArgs> = {
        [P in keyof T & keyof AggregateHolidays]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHolidays[P]>
      : GetScalarType<T[P], AggregateHolidays[P]>
  }




  export type holidaysGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: holidaysWhereInput
    orderBy?: holidaysOrderByWithAggregationInput | holidaysOrderByWithAggregationInput[]
    by: HolidaysScalarFieldEnum[] | HolidaysScalarFieldEnum
    having?: holidaysScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HolidaysCountAggregateInputType | true
    _min?: HolidaysMinAggregateInputType
    _max?: HolidaysMaxAggregateInputType
  }

  export type HolidaysGroupByOutputType = {
    id: string
    name: string
    date: Date
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: HolidaysCountAggregateOutputType | null
    _min: HolidaysMinAggregateOutputType | null
    _max: HolidaysMaxAggregateOutputType | null
  }

  type GetHolidaysGroupByPayload<T extends holidaysGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HolidaysGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HolidaysGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HolidaysGroupByOutputType[P]>
            : GetScalarType<T[P], HolidaysGroupByOutputType[P]>
        }
      >
    >


  export type holidaysSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["holidays"]>

  export type holidaysSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["holidays"]>

  export type holidaysSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["holidays"]>

  export type holidaysSelectScalar = {
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type holidaysOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "date" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["holidays"]>

  export type $holidaysPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "holidays"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      date: Date
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["holidays"]>
    composites: {}
  }

  type holidaysGetPayload<S extends boolean | null | undefined | holidaysDefaultArgs> = $Result.GetResult<Prisma.$holidaysPayload, S>

  type holidaysCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<holidaysFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HolidaysCountAggregateInputType | true
    }

  export interface holidaysDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['holidays'], meta: { name: 'holidays' } }
    /**
     * Find zero or one Holidays that matches the filter.
     * @param {holidaysFindUniqueArgs} args - Arguments to find a Holidays
     * @example
     * // Get one Holidays
     * const holidays = await prisma.holidays.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends holidaysFindUniqueArgs>(args: SelectSubset<T, holidaysFindUniqueArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Holidays that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {holidaysFindUniqueOrThrowArgs} args - Arguments to find a Holidays
     * @example
     * // Get one Holidays
     * const holidays = await prisma.holidays.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends holidaysFindUniqueOrThrowArgs>(args: SelectSubset<T, holidaysFindUniqueOrThrowArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holidays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holidaysFindFirstArgs} args - Arguments to find a Holidays
     * @example
     * // Get one Holidays
     * const holidays = await prisma.holidays.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends holidaysFindFirstArgs>(args?: SelectSubset<T, holidaysFindFirstArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holidays that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holidaysFindFirstOrThrowArgs} args - Arguments to find a Holidays
     * @example
     * // Get one Holidays
     * const holidays = await prisma.holidays.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends holidaysFindFirstOrThrowArgs>(args?: SelectSubset<T, holidaysFindFirstOrThrowArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Holidays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holidaysFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holidays
     * const holidays = await prisma.holidays.findMany()
     * 
     * // Get first 10 Holidays
     * const holidays = await prisma.holidays.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const holidaysWithIdOnly = await prisma.holidays.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends holidaysFindManyArgs>(args?: SelectSubset<T, holidaysFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Holidays.
     * @param {holidaysCreateArgs} args - Arguments to create a Holidays.
     * @example
     * // Create one Holidays
     * const Holidays = await prisma.holidays.create({
     *   data: {
     *     // ... data to create a Holidays
     *   }
     * })
     * 
     */
    create<T extends holidaysCreateArgs>(args: SelectSubset<T, holidaysCreateArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Holidays.
     * @param {holidaysCreateManyArgs} args - Arguments to create many Holidays.
     * @example
     * // Create many Holidays
     * const holidays = await prisma.holidays.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends holidaysCreateManyArgs>(args?: SelectSubset<T, holidaysCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Holidays and returns the data saved in the database.
     * @param {holidaysCreateManyAndReturnArgs} args - Arguments to create many Holidays.
     * @example
     * // Create many Holidays
     * const holidays = await prisma.holidays.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Holidays and only return the `id`
     * const holidaysWithIdOnly = await prisma.holidays.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends holidaysCreateManyAndReturnArgs>(args?: SelectSubset<T, holidaysCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Holidays.
     * @param {holidaysDeleteArgs} args - Arguments to delete one Holidays.
     * @example
     * // Delete one Holidays
     * const Holidays = await prisma.holidays.delete({
     *   where: {
     *     // ... filter to delete one Holidays
     *   }
     * })
     * 
     */
    delete<T extends holidaysDeleteArgs>(args: SelectSubset<T, holidaysDeleteArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Holidays.
     * @param {holidaysUpdateArgs} args - Arguments to update one Holidays.
     * @example
     * // Update one Holidays
     * const holidays = await prisma.holidays.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends holidaysUpdateArgs>(args: SelectSubset<T, holidaysUpdateArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Holidays.
     * @param {holidaysDeleteManyArgs} args - Arguments to filter Holidays to delete.
     * @example
     * // Delete a few Holidays
     * const { count } = await prisma.holidays.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends holidaysDeleteManyArgs>(args?: SelectSubset<T, holidaysDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holidaysUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holidays
     * const holidays = await prisma.holidays.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends holidaysUpdateManyArgs>(args: SelectSubset<T, holidaysUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holidays and returns the data updated in the database.
     * @param {holidaysUpdateManyAndReturnArgs} args - Arguments to update many Holidays.
     * @example
     * // Update many Holidays
     * const holidays = await prisma.holidays.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Holidays and only return the `id`
     * const holidaysWithIdOnly = await prisma.holidays.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends holidaysUpdateManyAndReturnArgs>(args: SelectSubset<T, holidaysUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Holidays.
     * @param {holidaysUpsertArgs} args - Arguments to update or create a Holidays.
     * @example
     * // Update or create a Holidays
     * const holidays = await prisma.holidays.upsert({
     *   create: {
     *     // ... data to create a Holidays
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holidays we want to update
     *   }
     * })
     */
    upsert<T extends holidaysUpsertArgs>(args: SelectSubset<T, holidaysUpsertArgs<ExtArgs>>): Prisma__holidaysClient<$Result.GetResult<Prisma.$holidaysPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Holidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holidaysCountArgs} args - Arguments to filter Holidays to count.
     * @example
     * // Count the number of Holidays
     * const count = await prisma.holidays.count({
     *   where: {
     *     // ... the filter for the Holidays we want to count
     *   }
     * })
    **/
    count<T extends holidaysCountArgs>(
      args?: Subset<T, holidaysCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HolidaysCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidaysAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HolidaysAggregateArgs>(args: Subset<T, HolidaysAggregateArgs>): Prisma.PrismaPromise<GetHolidaysAggregateType<T>>

    /**
     * Group by Holidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {holidaysGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends holidaysGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: holidaysGroupByArgs['orderBy'] }
        : { orderBy?: holidaysGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, holidaysGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHolidaysGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the holidays model
   */
  readonly fields: holidaysFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for holidays.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__holidaysClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the holidays model
   */
  interface holidaysFieldRefs {
    readonly id: FieldRef<"holidays", 'String'>
    readonly name: FieldRef<"holidays", 'String'>
    readonly date: FieldRef<"holidays", 'DateTime'>
    readonly description: FieldRef<"holidays", 'String'>
    readonly isActive: FieldRef<"holidays", 'Boolean'>
    readonly createdAt: FieldRef<"holidays", 'DateTime'>
    readonly updatedAt: FieldRef<"holidays", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * holidays findUnique
   */
  export type holidaysFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * Filter, which holidays to fetch.
     */
    where: holidaysWhereUniqueInput
  }

  /**
   * holidays findUniqueOrThrow
   */
  export type holidaysFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * Filter, which holidays to fetch.
     */
    where: holidaysWhereUniqueInput
  }

  /**
   * holidays findFirst
   */
  export type holidaysFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * Filter, which holidays to fetch.
     */
    where?: holidaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of holidays to fetch.
     */
    orderBy?: holidaysOrderByWithRelationInput | holidaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for holidays.
     */
    cursor?: holidaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` holidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of holidays.
     */
    distinct?: HolidaysScalarFieldEnum | HolidaysScalarFieldEnum[]
  }

  /**
   * holidays findFirstOrThrow
   */
  export type holidaysFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * Filter, which holidays to fetch.
     */
    where?: holidaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of holidays to fetch.
     */
    orderBy?: holidaysOrderByWithRelationInput | holidaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for holidays.
     */
    cursor?: holidaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` holidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of holidays.
     */
    distinct?: HolidaysScalarFieldEnum | HolidaysScalarFieldEnum[]
  }

  /**
   * holidays findMany
   */
  export type holidaysFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * Filter, which holidays to fetch.
     */
    where?: holidaysWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of holidays to fetch.
     */
    orderBy?: holidaysOrderByWithRelationInput | holidaysOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing holidays.
     */
    cursor?: holidaysWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` holidays.
     */
    skip?: number
    distinct?: HolidaysScalarFieldEnum | HolidaysScalarFieldEnum[]
  }

  /**
   * holidays create
   */
  export type holidaysCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * The data needed to create a holidays.
     */
    data: XOR<holidaysCreateInput, holidaysUncheckedCreateInput>
  }

  /**
   * holidays createMany
   */
  export type holidaysCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many holidays.
     */
    data: holidaysCreateManyInput | holidaysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * holidays createManyAndReturn
   */
  export type holidaysCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * The data used to create many holidays.
     */
    data: holidaysCreateManyInput | holidaysCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * holidays update
   */
  export type holidaysUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * The data needed to update a holidays.
     */
    data: XOR<holidaysUpdateInput, holidaysUncheckedUpdateInput>
    /**
     * Choose, which holidays to update.
     */
    where: holidaysWhereUniqueInput
  }

  /**
   * holidays updateMany
   */
  export type holidaysUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update holidays.
     */
    data: XOR<holidaysUpdateManyMutationInput, holidaysUncheckedUpdateManyInput>
    /**
     * Filter which holidays to update
     */
    where?: holidaysWhereInput
    /**
     * Limit how many holidays to update.
     */
    limit?: number
  }

  /**
   * holidays updateManyAndReturn
   */
  export type holidaysUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * The data used to update holidays.
     */
    data: XOR<holidaysUpdateManyMutationInput, holidaysUncheckedUpdateManyInput>
    /**
     * Filter which holidays to update
     */
    where?: holidaysWhereInput
    /**
     * Limit how many holidays to update.
     */
    limit?: number
  }

  /**
   * holidays upsert
   */
  export type holidaysUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * The filter to search for the holidays to update in case it exists.
     */
    where: holidaysWhereUniqueInput
    /**
     * In case the holidays found by the `where` argument doesn't exist, create a new holidays with this data.
     */
    create: XOR<holidaysCreateInput, holidaysUncheckedCreateInput>
    /**
     * In case the holidays was found with the provided `where` argument, update it with this data.
     */
    update: XOR<holidaysUpdateInput, holidaysUncheckedUpdateInput>
  }

  /**
   * holidays delete
   */
  export type holidaysDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
    /**
     * Filter which holidays to delete.
     */
    where: holidaysWhereUniqueInput
  }

  /**
   * holidays deleteMany
   */
  export type holidaysDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which holidays to delete
     */
    where?: holidaysWhereInput
    /**
     * Limit how many holidays to delete.
     */
    limit?: number
  }

  /**
   * holidays without action
   */
  export type holidaysDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the holidays
     */
    select?: holidaysSelect<ExtArgs> | null
    /**
     * Omit specific fields from the holidays
     */
    omit?: holidaysOmit<ExtArgs> | null
  }


  /**
   * Model leave_balances
   */

  export type AggregateLeave_balances = {
    _count: Leave_balancesCountAggregateOutputType | null
    _avg: Leave_balancesAvgAggregateOutputType | null
    _sum: Leave_balancesSumAggregateOutputType | null
    _min: Leave_balancesMinAggregateOutputType | null
    _max: Leave_balancesMaxAggregateOutputType | null
  }

  export type Leave_balancesAvgAggregateOutputType = {
    balance: Decimal | null
    used: Decimal | null
    carryForward: Decimal | null
    year: number | null
  }

  export type Leave_balancesSumAggregateOutputType = {
    balance: Decimal | null
    used: Decimal | null
    carryForward: Decimal | null
    year: number | null
  }

  export type Leave_balancesMinAggregateOutputType = {
    id: string | null
    userId: string | null
    leaveTypeId: string | null
    balance: Decimal | null
    used: Decimal | null
    carryForward: Decimal | null
    year: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Leave_balancesMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    leaveTypeId: string | null
    balance: Decimal | null
    used: Decimal | null
    carryForward: Decimal | null
    year: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Leave_balancesCountAggregateOutputType = {
    id: number
    userId: number
    leaveTypeId: number
    balance: number
    used: number
    carryForward: number
    year: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Leave_balancesAvgAggregateInputType = {
    balance?: true
    used?: true
    carryForward?: true
    year?: true
  }

  export type Leave_balancesSumAggregateInputType = {
    balance?: true
    used?: true
    carryForward?: true
    year?: true
  }

  export type Leave_balancesMinAggregateInputType = {
    id?: true
    userId?: true
    leaveTypeId?: true
    balance?: true
    used?: true
    carryForward?: true
    year?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Leave_balancesMaxAggregateInputType = {
    id?: true
    userId?: true
    leaveTypeId?: true
    balance?: true
    used?: true
    carryForward?: true
    year?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Leave_balancesCountAggregateInputType = {
    id?: true
    userId?: true
    leaveTypeId?: true
    balance?: true
    used?: true
    carryForward?: true
    year?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Leave_balancesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_balances to aggregate.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned leave_balances
    **/
    _count?: true | Leave_balancesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Leave_balancesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Leave_balancesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Leave_balancesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Leave_balancesMaxAggregateInputType
  }

  export type GetLeave_balancesAggregateType<T extends Leave_balancesAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave_balances]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave_balances[P]>
      : GetScalarType<T[P], AggregateLeave_balances[P]>
  }




  export type leave_balancesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_balancesWhereInput
    orderBy?: leave_balancesOrderByWithAggregationInput | leave_balancesOrderByWithAggregationInput[]
    by: Leave_balancesScalarFieldEnum[] | Leave_balancesScalarFieldEnum
    having?: leave_balancesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Leave_balancesCountAggregateInputType | true
    _avg?: Leave_balancesAvgAggregateInputType
    _sum?: Leave_balancesSumAggregateInputType
    _min?: Leave_balancesMinAggregateInputType
    _max?: Leave_balancesMaxAggregateInputType
  }

  export type Leave_balancesGroupByOutputType = {
    id: string
    userId: string
    leaveTypeId: string
    balance: Decimal
    used: Decimal
    carryForward: Decimal
    year: number
    createdAt: Date
    updatedAt: Date
    _count: Leave_balancesCountAggregateOutputType | null
    _avg: Leave_balancesAvgAggregateOutputType | null
    _sum: Leave_balancesSumAggregateOutputType | null
    _min: Leave_balancesMinAggregateOutputType | null
    _max: Leave_balancesMaxAggregateOutputType | null
  }

  type GetLeave_balancesGroupByPayload<T extends leave_balancesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Leave_balancesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Leave_balancesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Leave_balancesGroupByOutputType[P]>
            : GetScalarType<T[P], Leave_balancesGroupByOutputType[P]>
        }
      >
    >


  export type leave_balancesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    balance?: boolean
    used?: boolean
    carryForward?: boolean
    year?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_balances"]>

  export type leave_balancesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    balance?: boolean
    used?: boolean
    carryForward?: boolean
    year?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_balances"]>

  export type leave_balancesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    balance?: boolean
    used?: boolean
    carryForward?: boolean
    year?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_balances"]>

  export type leave_balancesSelectScalar = {
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    balance?: boolean
    used?: boolean
    carryForward?: boolean
    year?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type leave_balancesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "leaveTypeId" | "balance" | "used" | "carryForward" | "year" | "createdAt" | "updatedAt", ExtArgs["result"]["leave_balances"]>
  export type leave_balancesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_balancesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_balancesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $leave_balancesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "leave_balances"
    objects: {
      leave_types: Prisma.$leave_typesPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      leaveTypeId: string
      balance: Prisma.Decimal
      used: Prisma.Decimal
      carryForward: Prisma.Decimal
      year: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leave_balances"]>
    composites: {}
  }

  type leave_balancesGetPayload<S extends boolean | null | undefined | leave_balancesDefaultArgs> = $Result.GetResult<Prisma.$leave_balancesPayload, S>

  type leave_balancesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<leave_balancesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Leave_balancesCountAggregateInputType | true
    }

  export interface leave_balancesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['leave_balances'], meta: { name: 'leave_balances' } }
    /**
     * Find zero or one Leave_balances that matches the filter.
     * @param {leave_balancesFindUniqueArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends leave_balancesFindUniqueArgs>(args: SelectSubset<T, leave_balancesFindUniqueArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Leave_balances that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {leave_balancesFindUniqueOrThrowArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends leave_balancesFindUniqueOrThrowArgs>(args: SelectSubset<T, leave_balancesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_balances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesFindFirstArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends leave_balancesFindFirstArgs>(args?: SelectSubset<T, leave_balancesFindFirstArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_balances that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesFindFirstOrThrowArgs} args - Arguments to find a Leave_balances
     * @example
     * // Get one Leave_balances
     * const leave_balances = await prisma.leave_balances.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends leave_balancesFindFirstOrThrowArgs>(args?: SelectSubset<T, leave_balancesFindFirstOrThrowArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leave_balances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leave_balances
     * const leave_balances = await prisma.leave_balances.findMany()
     * 
     * // Get first 10 Leave_balances
     * const leave_balances = await prisma.leave_balances.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leave_balancesWithIdOnly = await prisma.leave_balances.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends leave_balancesFindManyArgs>(args?: SelectSubset<T, leave_balancesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Leave_balances.
     * @param {leave_balancesCreateArgs} args - Arguments to create a Leave_balances.
     * @example
     * // Create one Leave_balances
     * const Leave_balances = await prisma.leave_balances.create({
     *   data: {
     *     // ... data to create a Leave_balances
     *   }
     * })
     * 
     */
    create<T extends leave_balancesCreateArgs>(args: SelectSubset<T, leave_balancesCreateArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leave_balances.
     * @param {leave_balancesCreateManyArgs} args - Arguments to create many Leave_balances.
     * @example
     * // Create many Leave_balances
     * const leave_balances = await prisma.leave_balances.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends leave_balancesCreateManyArgs>(args?: SelectSubset<T, leave_balancesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leave_balances and returns the data saved in the database.
     * @param {leave_balancesCreateManyAndReturnArgs} args - Arguments to create many Leave_balances.
     * @example
     * // Create many Leave_balances
     * const leave_balances = await prisma.leave_balances.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leave_balances and only return the `id`
     * const leave_balancesWithIdOnly = await prisma.leave_balances.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends leave_balancesCreateManyAndReturnArgs>(args?: SelectSubset<T, leave_balancesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Leave_balances.
     * @param {leave_balancesDeleteArgs} args - Arguments to delete one Leave_balances.
     * @example
     * // Delete one Leave_balances
     * const Leave_balances = await prisma.leave_balances.delete({
     *   where: {
     *     // ... filter to delete one Leave_balances
     *   }
     * })
     * 
     */
    delete<T extends leave_balancesDeleteArgs>(args: SelectSubset<T, leave_balancesDeleteArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Leave_balances.
     * @param {leave_balancesUpdateArgs} args - Arguments to update one Leave_balances.
     * @example
     * // Update one Leave_balances
     * const leave_balances = await prisma.leave_balances.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends leave_balancesUpdateArgs>(args: SelectSubset<T, leave_balancesUpdateArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leave_balances.
     * @param {leave_balancesDeleteManyArgs} args - Arguments to filter Leave_balances to delete.
     * @example
     * // Delete a few Leave_balances
     * const { count } = await prisma.leave_balances.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends leave_balancesDeleteManyArgs>(args?: SelectSubset<T, leave_balancesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leave_balances
     * const leave_balances = await prisma.leave_balances.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends leave_balancesUpdateManyArgs>(args: SelectSubset<T, leave_balancesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_balances and returns the data updated in the database.
     * @param {leave_balancesUpdateManyAndReturnArgs} args - Arguments to update many Leave_balances.
     * @example
     * // Update many Leave_balances
     * const leave_balances = await prisma.leave_balances.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leave_balances and only return the `id`
     * const leave_balancesWithIdOnly = await prisma.leave_balances.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends leave_balancesUpdateManyAndReturnArgs>(args: SelectSubset<T, leave_balancesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Leave_balances.
     * @param {leave_balancesUpsertArgs} args - Arguments to update or create a Leave_balances.
     * @example
     * // Update or create a Leave_balances
     * const leave_balances = await prisma.leave_balances.upsert({
     *   create: {
     *     // ... data to create a Leave_balances
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave_balances we want to update
     *   }
     * })
     */
    upsert<T extends leave_balancesUpsertArgs>(args: SelectSubset<T, leave_balancesUpsertArgs<ExtArgs>>): Prisma__leave_balancesClient<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesCountArgs} args - Arguments to filter Leave_balances to count.
     * @example
     * // Count the number of Leave_balances
     * const count = await prisma.leave_balances.count({
     *   where: {
     *     // ... the filter for the Leave_balances we want to count
     *   }
     * })
    **/
    count<T extends leave_balancesCountArgs>(
      args?: Subset<T, leave_balancesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Leave_balancesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Leave_balancesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Leave_balancesAggregateArgs>(args: Subset<T, Leave_balancesAggregateArgs>): Prisma.PrismaPromise<GetLeave_balancesAggregateType<T>>

    /**
     * Group by Leave_balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_balancesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends leave_balancesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: leave_balancesGroupByArgs['orderBy'] }
        : { orderBy?: leave_balancesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, leave_balancesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeave_balancesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the leave_balances model
   */
  readonly fields: leave_balancesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for leave_balances.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__leave_balancesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_types<T extends leave_typesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, leave_typesDefaultArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the leave_balances model
   */
  interface leave_balancesFieldRefs {
    readonly id: FieldRef<"leave_balances", 'String'>
    readonly userId: FieldRef<"leave_balances", 'String'>
    readonly leaveTypeId: FieldRef<"leave_balances", 'String'>
    readonly balance: FieldRef<"leave_balances", 'Decimal'>
    readonly used: FieldRef<"leave_balances", 'Decimal'>
    readonly carryForward: FieldRef<"leave_balances", 'Decimal'>
    readonly year: FieldRef<"leave_balances", 'Int'>
    readonly createdAt: FieldRef<"leave_balances", 'DateTime'>
    readonly updatedAt: FieldRef<"leave_balances", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * leave_balances findUnique
   */
  export type leave_balancesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances findUniqueOrThrow
   */
  export type leave_balancesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances findFirst
   */
  export type leave_balancesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_balances.
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_balances.
     */
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_balances findFirstOrThrow
   */
  export type leave_balancesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_balances.
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_balances.
     */
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_balances findMany
   */
  export type leave_balancesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter, which leave_balances to fetch.
     */
    where?: leave_balancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_balances to fetch.
     */
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing leave_balances.
     */
    cursor?: leave_balancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_balances.
     */
    skip?: number
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_balances create
   */
  export type leave_balancesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * The data needed to create a leave_balances.
     */
    data: XOR<leave_balancesCreateInput, leave_balancesUncheckedCreateInput>
  }

  /**
   * leave_balances createMany
   */
  export type leave_balancesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many leave_balances.
     */
    data: leave_balancesCreateManyInput | leave_balancesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_balances createManyAndReturn
   */
  export type leave_balancesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * The data used to create many leave_balances.
     */
    data: leave_balancesCreateManyInput | leave_balancesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_balances update
   */
  export type leave_balancesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * The data needed to update a leave_balances.
     */
    data: XOR<leave_balancesUpdateInput, leave_balancesUncheckedUpdateInput>
    /**
     * Choose, which leave_balances to update.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances updateMany
   */
  export type leave_balancesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update leave_balances.
     */
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyInput>
    /**
     * Filter which leave_balances to update
     */
    where?: leave_balancesWhereInput
    /**
     * Limit how many leave_balances to update.
     */
    limit?: number
  }

  /**
   * leave_balances updateManyAndReturn
   */
  export type leave_balancesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * The data used to update leave_balances.
     */
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyInput>
    /**
     * Filter which leave_balances to update
     */
    where?: leave_balancesWhereInput
    /**
     * Limit how many leave_balances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_balances upsert
   */
  export type leave_balancesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * The filter to search for the leave_balances to update in case it exists.
     */
    where: leave_balancesWhereUniqueInput
    /**
     * In case the leave_balances found by the `where` argument doesn't exist, create a new leave_balances with this data.
     */
    create: XOR<leave_balancesCreateInput, leave_balancesUncheckedCreateInput>
    /**
     * In case the leave_balances was found with the provided `where` argument, update it with this data.
     */
    update: XOR<leave_balancesUpdateInput, leave_balancesUncheckedUpdateInput>
  }

  /**
   * leave_balances delete
   */
  export type leave_balancesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    /**
     * Filter which leave_balances to delete.
     */
    where: leave_balancesWhereUniqueInput
  }

  /**
   * leave_balances deleteMany
   */
  export type leave_balancesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_balances to delete
     */
    where?: leave_balancesWhereInput
    /**
     * Limit how many leave_balances to delete.
     */
    limit?: number
  }

  /**
   * leave_balances without action
   */
  export type leave_balancesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
  }


  /**
   * Model leave_requests
   */

  export type AggregateLeave_requests = {
    _count: Leave_requestsCountAggregateOutputType | null
    _avg: Leave_requestsAvgAggregateOutputType | null
    _sum: Leave_requestsSumAggregateOutputType | null
    _min: Leave_requestsMinAggregateOutputType | null
    _max: Leave_requestsMaxAggregateOutputType | null
  }

  export type Leave_requestsAvgAggregateOutputType = {
    numberOfDays: Decimal | null
  }

  export type Leave_requestsSumAggregateOutputType = {
    numberOfDays: Decimal | null
  }

  export type Leave_requestsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    leaveTypeId: string | null
    startDate: Date | null
    endDate: Date | null
    requestType: $Enums.leave_request_type_enum | null
    numberOfDays: Decimal | null
    reason: string | null
    status: $Enums.leave_request_status_enum | null
    approverId: string | null
    approverComments: string | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Leave_requestsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    leaveTypeId: string | null
    startDate: Date | null
    endDate: Date | null
    requestType: $Enums.leave_request_type_enum | null
    numberOfDays: Decimal | null
    reason: string | null
    status: $Enums.leave_request_status_enum | null
    approverId: string | null
    approverComments: string | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Leave_requestsCountAggregateOutputType = {
    id: number
    userId: number
    leaveTypeId: number
    startDate: number
    endDate: number
    requestType: number
    numberOfDays: number
    reason: number
    status: number
    approverId: number
    approverComments: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    metadata: number
    _all: number
  }


  export type Leave_requestsAvgAggregateInputType = {
    numberOfDays?: true
  }

  export type Leave_requestsSumAggregateInputType = {
    numberOfDays?: true
  }

  export type Leave_requestsMinAggregateInputType = {
    id?: true
    userId?: true
    leaveTypeId?: true
    startDate?: true
    endDate?: true
    requestType?: true
    numberOfDays?: true
    reason?: true
    status?: true
    approverId?: true
    approverComments?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Leave_requestsMaxAggregateInputType = {
    id?: true
    userId?: true
    leaveTypeId?: true
    startDate?: true
    endDate?: true
    requestType?: true
    numberOfDays?: true
    reason?: true
    status?: true
    approverId?: true
    approverComments?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Leave_requestsCountAggregateInputType = {
    id?: true
    userId?: true
    leaveTypeId?: true
    startDate?: true
    endDate?: true
    requestType?: true
    numberOfDays?: true
    reason?: true
    status?: true
    approverId?: true
    approverComments?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    metadata?: true
    _all?: true
  }

  export type Leave_requestsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_requests to aggregate.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned leave_requests
    **/
    _count?: true | Leave_requestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Leave_requestsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Leave_requestsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Leave_requestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Leave_requestsMaxAggregateInputType
  }

  export type GetLeave_requestsAggregateType<T extends Leave_requestsAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave_requests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave_requests[P]>
      : GetScalarType<T[P], AggregateLeave_requests[P]>
  }




  export type leave_requestsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithAggregationInput | leave_requestsOrderByWithAggregationInput[]
    by: Leave_requestsScalarFieldEnum[] | Leave_requestsScalarFieldEnum
    having?: leave_requestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Leave_requestsCountAggregateInputType | true
    _avg?: Leave_requestsAvgAggregateInputType
    _sum?: Leave_requestsSumAggregateInputType
    _min?: Leave_requestsMinAggregateInputType
    _max?: Leave_requestsMaxAggregateInputType
  }

  export type Leave_requestsGroupByOutputType = {
    id: string
    userId: string
    leaveTypeId: string
    startDate: Date
    endDate: Date
    requestType: $Enums.leave_request_type_enum
    numberOfDays: Decimal
    reason: string
    status: $Enums.leave_request_status_enum
    approverId: string | null
    approverComments: string | null
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    metadata: JsonValue | null
    _count: Leave_requestsCountAggregateOutputType | null
    _avg: Leave_requestsAvgAggregateOutputType | null
    _sum: Leave_requestsSumAggregateOutputType | null
    _min: Leave_requestsMinAggregateOutputType | null
    _max: Leave_requestsMaxAggregateOutputType | null
  }

  type GetLeave_requestsGroupByPayload<T extends leave_requestsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Leave_requestsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Leave_requestsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Leave_requestsGroupByOutputType[P]>
            : GetScalarType<T[P], Leave_requestsGroupByOutputType[P]>
        }
      >
    >


  export type leave_requestsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    startDate?: boolean
    endDate?: boolean
    requestType?: boolean
    numberOfDays?: boolean
    reason?: boolean
    status?: boolean
    approverId?: boolean
    approverComments?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    metadata?: boolean
    users_leave_requests_approverIdTousers?: boolean | leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users_leave_requests_userIdTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_requests"]>

  export type leave_requestsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    startDate?: boolean
    endDate?: boolean
    requestType?: boolean
    numberOfDays?: boolean
    reason?: boolean
    status?: boolean
    approverId?: boolean
    approverComments?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    metadata?: boolean
    users_leave_requests_approverIdTousers?: boolean | leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users_leave_requests_userIdTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_requests"]>

  export type leave_requestsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    startDate?: boolean
    endDate?: boolean
    requestType?: boolean
    numberOfDays?: boolean
    reason?: boolean
    status?: boolean
    approverId?: boolean
    approverComments?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    metadata?: boolean
    users_leave_requests_approverIdTousers?: boolean | leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users_leave_requests_userIdTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_requests"]>

  export type leave_requestsSelectScalar = {
    id?: boolean
    userId?: boolean
    leaveTypeId?: boolean
    startDate?: boolean
    endDate?: boolean
    requestType?: boolean
    numberOfDays?: boolean
    reason?: boolean
    status?: boolean
    approverId?: boolean
    approverComments?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    metadata?: boolean
  }

  export type leave_requestsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "leaveTypeId" | "startDate" | "endDate" | "requestType" | "numberOfDays" | "reason" | "status" | "approverId" | "approverComments" | "approvedAt" | "createdAt" | "updatedAt" | "metadata", ExtArgs["result"]["leave_requests"]>
  export type leave_requestsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_leave_requests_approverIdTousers?: boolean | leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users_leave_requests_userIdTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_requestsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_leave_requests_approverIdTousers?: boolean | leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users_leave_requests_userIdTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type leave_requestsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_leave_requests_approverIdTousers?: boolean | leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_types?: boolean | leave_typesDefaultArgs<ExtArgs>
    users_leave_requests_userIdTousers?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $leave_requestsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "leave_requests"
    objects: {
      users_leave_requests_approverIdTousers: Prisma.$usersPayload<ExtArgs> | null
      leave_types: Prisma.$leave_typesPayload<ExtArgs>
      users_leave_requests_userIdTousers: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      leaveTypeId: string
      startDate: Date
      endDate: Date
      requestType: $Enums.leave_request_type_enum
      numberOfDays: Prisma.Decimal
      reason: string
      status: $Enums.leave_request_status_enum
      approverId: string | null
      approverComments: string | null
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["leave_requests"]>
    composites: {}
  }

  type leave_requestsGetPayload<S extends boolean | null | undefined | leave_requestsDefaultArgs> = $Result.GetResult<Prisma.$leave_requestsPayload, S>

  type leave_requestsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<leave_requestsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Leave_requestsCountAggregateInputType | true
    }

  export interface leave_requestsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['leave_requests'], meta: { name: 'leave_requests' } }
    /**
     * Find zero or one Leave_requests that matches the filter.
     * @param {leave_requestsFindUniqueArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends leave_requestsFindUniqueArgs>(args: SelectSubset<T, leave_requestsFindUniqueArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Leave_requests that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {leave_requestsFindUniqueOrThrowArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends leave_requestsFindUniqueOrThrowArgs>(args: SelectSubset<T, leave_requestsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsFindFirstArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends leave_requestsFindFirstArgs>(args?: SelectSubset<T, leave_requestsFindFirstArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_requests that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsFindFirstOrThrowArgs} args - Arguments to find a Leave_requests
     * @example
     * // Get one Leave_requests
     * const leave_requests = await prisma.leave_requests.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends leave_requestsFindFirstOrThrowArgs>(args?: SelectSubset<T, leave_requestsFindFirstOrThrowArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leave_requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leave_requests
     * const leave_requests = await prisma.leave_requests.findMany()
     * 
     * // Get first 10 Leave_requests
     * const leave_requests = await prisma.leave_requests.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leave_requestsWithIdOnly = await prisma.leave_requests.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends leave_requestsFindManyArgs>(args?: SelectSubset<T, leave_requestsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Leave_requests.
     * @param {leave_requestsCreateArgs} args - Arguments to create a Leave_requests.
     * @example
     * // Create one Leave_requests
     * const Leave_requests = await prisma.leave_requests.create({
     *   data: {
     *     // ... data to create a Leave_requests
     *   }
     * })
     * 
     */
    create<T extends leave_requestsCreateArgs>(args: SelectSubset<T, leave_requestsCreateArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leave_requests.
     * @param {leave_requestsCreateManyArgs} args - Arguments to create many Leave_requests.
     * @example
     * // Create many Leave_requests
     * const leave_requests = await prisma.leave_requests.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends leave_requestsCreateManyArgs>(args?: SelectSubset<T, leave_requestsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leave_requests and returns the data saved in the database.
     * @param {leave_requestsCreateManyAndReturnArgs} args - Arguments to create many Leave_requests.
     * @example
     * // Create many Leave_requests
     * const leave_requests = await prisma.leave_requests.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leave_requests and only return the `id`
     * const leave_requestsWithIdOnly = await prisma.leave_requests.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends leave_requestsCreateManyAndReturnArgs>(args?: SelectSubset<T, leave_requestsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Leave_requests.
     * @param {leave_requestsDeleteArgs} args - Arguments to delete one Leave_requests.
     * @example
     * // Delete one Leave_requests
     * const Leave_requests = await prisma.leave_requests.delete({
     *   where: {
     *     // ... filter to delete one Leave_requests
     *   }
     * })
     * 
     */
    delete<T extends leave_requestsDeleteArgs>(args: SelectSubset<T, leave_requestsDeleteArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Leave_requests.
     * @param {leave_requestsUpdateArgs} args - Arguments to update one Leave_requests.
     * @example
     * // Update one Leave_requests
     * const leave_requests = await prisma.leave_requests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends leave_requestsUpdateArgs>(args: SelectSubset<T, leave_requestsUpdateArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leave_requests.
     * @param {leave_requestsDeleteManyArgs} args - Arguments to filter Leave_requests to delete.
     * @example
     * // Delete a few Leave_requests
     * const { count } = await prisma.leave_requests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends leave_requestsDeleteManyArgs>(args?: SelectSubset<T, leave_requestsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leave_requests
     * const leave_requests = await prisma.leave_requests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends leave_requestsUpdateManyArgs>(args: SelectSubset<T, leave_requestsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_requests and returns the data updated in the database.
     * @param {leave_requestsUpdateManyAndReturnArgs} args - Arguments to update many Leave_requests.
     * @example
     * // Update many Leave_requests
     * const leave_requests = await prisma.leave_requests.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leave_requests and only return the `id`
     * const leave_requestsWithIdOnly = await prisma.leave_requests.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends leave_requestsUpdateManyAndReturnArgs>(args: SelectSubset<T, leave_requestsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Leave_requests.
     * @param {leave_requestsUpsertArgs} args - Arguments to update or create a Leave_requests.
     * @example
     * // Update or create a Leave_requests
     * const leave_requests = await prisma.leave_requests.upsert({
     *   create: {
     *     // ... data to create a Leave_requests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave_requests we want to update
     *   }
     * })
     */
    upsert<T extends leave_requestsUpsertArgs>(args: SelectSubset<T, leave_requestsUpsertArgs<ExtArgs>>): Prisma__leave_requestsClient<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsCountArgs} args - Arguments to filter Leave_requests to count.
     * @example
     * // Count the number of Leave_requests
     * const count = await prisma.leave_requests.count({
     *   where: {
     *     // ... the filter for the Leave_requests we want to count
     *   }
     * })
    **/
    count<T extends leave_requestsCountArgs>(
      args?: Subset<T, leave_requestsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Leave_requestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Leave_requestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Leave_requestsAggregateArgs>(args: Subset<T, Leave_requestsAggregateArgs>): Prisma.PrismaPromise<GetLeave_requestsAggregateType<T>>

    /**
     * Group by Leave_requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_requestsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends leave_requestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: leave_requestsGroupByArgs['orderBy'] }
        : { orderBy?: leave_requestsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, leave_requestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeave_requestsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the leave_requests model
   */
  readonly fields: leave_requestsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for leave_requests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__leave_requestsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_leave_requests_approverIdTousers<T extends leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    leave_types<T extends leave_typesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, leave_typesDefaultArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_leave_requests_userIdTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the leave_requests model
   */
  interface leave_requestsFieldRefs {
    readonly id: FieldRef<"leave_requests", 'String'>
    readonly userId: FieldRef<"leave_requests", 'String'>
    readonly leaveTypeId: FieldRef<"leave_requests", 'String'>
    readonly startDate: FieldRef<"leave_requests", 'DateTime'>
    readonly endDate: FieldRef<"leave_requests", 'DateTime'>
    readonly requestType: FieldRef<"leave_requests", 'leave_request_type_enum'>
    readonly numberOfDays: FieldRef<"leave_requests", 'Decimal'>
    readonly reason: FieldRef<"leave_requests", 'String'>
    readonly status: FieldRef<"leave_requests", 'leave_request_status_enum'>
    readonly approverId: FieldRef<"leave_requests", 'String'>
    readonly approverComments: FieldRef<"leave_requests", 'String'>
    readonly approvedAt: FieldRef<"leave_requests", 'DateTime'>
    readonly createdAt: FieldRef<"leave_requests", 'DateTime'>
    readonly updatedAt: FieldRef<"leave_requests", 'DateTime'>
    readonly metadata: FieldRef<"leave_requests", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * leave_requests findUnique
   */
  export type leave_requestsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests findUniqueOrThrow
   */
  export type leave_requestsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests findFirst
   */
  export type leave_requestsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_requests.
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_requests.
     */
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_requests findFirstOrThrow
   */
  export type leave_requestsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_requests.
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_requests.
     */
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_requests findMany
   */
  export type leave_requestsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter, which leave_requests to fetch.
     */
    where?: leave_requestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_requests to fetch.
     */
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing leave_requests.
     */
    cursor?: leave_requestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_requests.
     */
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_requests create
   */
  export type leave_requestsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * The data needed to create a leave_requests.
     */
    data: XOR<leave_requestsCreateInput, leave_requestsUncheckedCreateInput>
  }

  /**
   * leave_requests createMany
   */
  export type leave_requestsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many leave_requests.
     */
    data: leave_requestsCreateManyInput | leave_requestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_requests createManyAndReturn
   */
  export type leave_requestsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * The data used to create many leave_requests.
     */
    data: leave_requestsCreateManyInput | leave_requestsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_requests update
   */
  export type leave_requestsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * The data needed to update a leave_requests.
     */
    data: XOR<leave_requestsUpdateInput, leave_requestsUncheckedUpdateInput>
    /**
     * Choose, which leave_requests to update.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests updateMany
   */
  export type leave_requestsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update leave_requests.
     */
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyInput>
    /**
     * Filter which leave_requests to update
     */
    where?: leave_requestsWhereInput
    /**
     * Limit how many leave_requests to update.
     */
    limit?: number
  }

  /**
   * leave_requests updateManyAndReturn
   */
  export type leave_requestsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * The data used to update leave_requests.
     */
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyInput>
    /**
     * Filter which leave_requests to update
     */
    where?: leave_requestsWhereInput
    /**
     * Limit how many leave_requests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * leave_requests upsert
   */
  export type leave_requestsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * The filter to search for the leave_requests to update in case it exists.
     */
    where: leave_requestsWhereUniqueInput
    /**
     * In case the leave_requests found by the `where` argument doesn't exist, create a new leave_requests with this data.
     */
    create: XOR<leave_requestsCreateInput, leave_requestsUncheckedCreateInput>
    /**
     * In case the leave_requests was found with the provided `where` argument, update it with this data.
     */
    update: XOR<leave_requestsUpdateInput, leave_requestsUncheckedUpdateInput>
  }

  /**
   * leave_requests delete
   */
  export type leave_requestsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    /**
     * Filter which leave_requests to delete.
     */
    where: leave_requestsWhereUniqueInput
  }

  /**
   * leave_requests deleteMany
   */
  export type leave_requestsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_requests to delete
     */
    where?: leave_requestsWhereInput
    /**
     * Limit how many leave_requests to delete.
     */
    limit?: number
  }

  /**
   * leave_requests.users_leave_requests_approverIdTousers
   */
  export type leave_requests$users_leave_requests_approverIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * leave_requests without action
   */
  export type leave_requestsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
  }


  /**
   * Model leave_types
   */

  export type AggregateLeave_types = {
    _count: Leave_typesCountAggregateOutputType | null
    _avg: Leave_typesAvgAggregateOutputType | null
    _sum: Leave_typesSumAggregateOutputType | null
    _min: Leave_typesMinAggregateOutputType | null
    _max: Leave_typesMaxAggregateOutputType | null
  }

  export type Leave_typesAvgAggregateOutputType = {
    defaultDays: number | null
    maxCarryForwardDays: number | null
  }

  export type Leave_typesSumAggregateOutputType = {
    defaultDays: number | null
    maxCarryForwardDays: number | null
  }

  export type Leave_typesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    defaultDays: number | null
    isCarryForward: boolean | null
    maxCarryForwardDays: number | null
    isActive: boolean | null
    applicableGender: string | null
    isHalfDayAllowed: boolean | null
    isPaidLeave: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Leave_typesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    defaultDays: number | null
    isCarryForward: boolean | null
    maxCarryForwardDays: number | null
    isActive: boolean | null
    applicableGender: string | null
    isHalfDayAllowed: boolean | null
    isPaidLeave: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Leave_typesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    defaultDays: number
    isCarryForward: number
    maxCarryForwardDays: number
    isActive: number
    applicableGender: number
    isHalfDayAllowed: number
    isPaidLeave: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Leave_typesAvgAggregateInputType = {
    defaultDays?: true
    maxCarryForwardDays?: true
  }

  export type Leave_typesSumAggregateInputType = {
    defaultDays?: true
    maxCarryForwardDays?: true
  }

  export type Leave_typesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    defaultDays?: true
    isCarryForward?: true
    maxCarryForwardDays?: true
    isActive?: true
    applicableGender?: true
    isHalfDayAllowed?: true
    isPaidLeave?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Leave_typesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    defaultDays?: true
    isCarryForward?: true
    maxCarryForwardDays?: true
    isActive?: true
    applicableGender?: true
    isHalfDayAllowed?: true
    isPaidLeave?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Leave_typesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    defaultDays?: true
    isCarryForward?: true
    maxCarryForwardDays?: true
    isActive?: true
    applicableGender?: true
    isHalfDayAllowed?: true
    isPaidLeave?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Leave_typesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_types to aggregate.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned leave_types
    **/
    _count?: true | Leave_typesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Leave_typesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Leave_typesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Leave_typesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Leave_typesMaxAggregateInputType
  }

  export type GetLeave_typesAggregateType<T extends Leave_typesAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave_types]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave_types[P]>
      : GetScalarType<T[P], AggregateLeave_types[P]>
  }




  export type leave_typesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: leave_typesWhereInput
    orderBy?: leave_typesOrderByWithAggregationInput | leave_typesOrderByWithAggregationInput[]
    by: Leave_typesScalarFieldEnum[] | Leave_typesScalarFieldEnum
    having?: leave_typesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Leave_typesCountAggregateInputType | true
    _avg?: Leave_typesAvgAggregateInputType
    _sum?: Leave_typesSumAggregateInputType
    _min?: Leave_typesMinAggregateInputType
    _max?: Leave_typesMaxAggregateInputType
  }

  export type Leave_typesGroupByOutputType = {
    id: string
    name: string
    description: string
    defaultDays: number
    isCarryForward: boolean
    maxCarryForwardDays: number
    isActive: boolean
    applicableGender: string | null
    isHalfDayAllowed: boolean
    isPaidLeave: boolean
    createdAt: Date
    updatedAt: Date
    _count: Leave_typesCountAggregateOutputType | null
    _avg: Leave_typesAvgAggregateOutputType | null
    _sum: Leave_typesSumAggregateOutputType | null
    _min: Leave_typesMinAggregateOutputType | null
    _max: Leave_typesMaxAggregateOutputType | null
  }

  type GetLeave_typesGroupByPayload<T extends leave_typesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Leave_typesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Leave_typesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Leave_typesGroupByOutputType[P]>
            : GetScalarType<T[P], Leave_typesGroupByOutputType[P]>
        }
      >
    >


  export type leave_typesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    defaultDays?: boolean
    isCarryForward?: boolean
    maxCarryForwardDays?: boolean
    isActive?: boolean
    applicableGender?: boolean
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leave_balances?: boolean | leave_types$leave_balancesArgs<ExtArgs>
    leave_requests?: boolean | leave_types$leave_requestsArgs<ExtArgs>
    _count?: boolean | Leave_typesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave_types"]>

  export type leave_typesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    defaultDays?: boolean
    isCarryForward?: boolean
    maxCarryForwardDays?: boolean
    isActive?: boolean
    applicableGender?: boolean
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["leave_types"]>

  export type leave_typesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    defaultDays?: boolean
    isCarryForward?: boolean
    maxCarryForwardDays?: boolean
    isActive?: boolean
    applicableGender?: boolean
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["leave_types"]>

  export type leave_typesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    defaultDays?: boolean
    isCarryForward?: boolean
    maxCarryForwardDays?: boolean
    isActive?: boolean
    applicableGender?: boolean
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type leave_typesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "defaultDays" | "isCarryForward" | "maxCarryForwardDays" | "isActive" | "applicableGender" | "isHalfDayAllowed" | "isPaidLeave" | "createdAt" | "updatedAt", ExtArgs["result"]["leave_types"]>
  export type leave_typesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave_balances?: boolean | leave_types$leave_balancesArgs<ExtArgs>
    leave_requests?: boolean | leave_types$leave_requestsArgs<ExtArgs>
    _count?: boolean | Leave_typesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type leave_typesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type leave_typesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $leave_typesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "leave_types"
    objects: {
      leave_balances: Prisma.$leave_balancesPayload<ExtArgs>[]
      leave_requests: Prisma.$leave_requestsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      defaultDays: number
      isCarryForward: boolean
      maxCarryForwardDays: number
      isActive: boolean
      applicableGender: string | null
      isHalfDayAllowed: boolean
      isPaidLeave: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leave_types"]>
    composites: {}
  }

  type leave_typesGetPayload<S extends boolean | null | undefined | leave_typesDefaultArgs> = $Result.GetResult<Prisma.$leave_typesPayload, S>

  type leave_typesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<leave_typesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Leave_typesCountAggregateInputType | true
    }

  export interface leave_typesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['leave_types'], meta: { name: 'leave_types' } }
    /**
     * Find zero or one Leave_types that matches the filter.
     * @param {leave_typesFindUniqueArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends leave_typesFindUniqueArgs>(args: SelectSubset<T, leave_typesFindUniqueArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Leave_types that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {leave_typesFindUniqueOrThrowArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends leave_typesFindUniqueOrThrowArgs>(args: SelectSubset<T, leave_typesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesFindFirstArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends leave_typesFindFirstArgs>(args?: SelectSubset<T, leave_typesFindFirstArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Leave_types that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesFindFirstOrThrowArgs} args - Arguments to find a Leave_types
     * @example
     * // Get one Leave_types
     * const leave_types = await prisma.leave_types.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends leave_typesFindFirstOrThrowArgs>(args?: SelectSubset<T, leave_typesFindFirstOrThrowArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leave_types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leave_types
     * const leave_types = await prisma.leave_types.findMany()
     * 
     * // Get first 10 Leave_types
     * const leave_types = await prisma.leave_types.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leave_typesWithIdOnly = await prisma.leave_types.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends leave_typesFindManyArgs>(args?: SelectSubset<T, leave_typesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Leave_types.
     * @param {leave_typesCreateArgs} args - Arguments to create a Leave_types.
     * @example
     * // Create one Leave_types
     * const Leave_types = await prisma.leave_types.create({
     *   data: {
     *     // ... data to create a Leave_types
     *   }
     * })
     * 
     */
    create<T extends leave_typesCreateArgs>(args: SelectSubset<T, leave_typesCreateArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leave_types.
     * @param {leave_typesCreateManyArgs} args - Arguments to create many Leave_types.
     * @example
     * // Create many Leave_types
     * const leave_types = await prisma.leave_types.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends leave_typesCreateManyArgs>(args?: SelectSubset<T, leave_typesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leave_types and returns the data saved in the database.
     * @param {leave_typesCreateManyAndReturnArgs} args - Arguments to create many Leave_types.
     * @example
     * // Create many Leave_types
     * const leave_types = await prisma.leave_types.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leave_types and only return the `id`
     * const leave_typesWithIdOnly = await prisma.leave_types.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends leave_typesCreateManyAndReturnArgs>(args?: SelectSubset<T, leave_typesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Leave_types.
     * @param {leave_typesDeleteArgs} args - Arguments to delete one Leave_types.
     * @example
     * // Delete one Leave_types
     * const Leave_types = await prisma.leave_types.delete({
     *   where: {
     *     // ... filter to delete one Leave_types
     *   }
     * })
     * 
     */
    delete<T extends leave_typesDeleteArgs>(args: SelectSubset<T, leave_typesDeleteArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Leave_types.
     * @param {leave_typesUpdateArgs} args - Arguments to update one Leave_types.
     * @example
     * // Update one Leave_types
     * const leave_types = await prisma.leave_types.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends leave_typesUpdateArgs>(args: SelectSubset<T, leave_typesUpdateArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leave_types.
     * @param {leave_typesDeleteManyArgs} args - Arguments to filter Leave_types to delete.
     * @example
     * // Delete a few Leave_types
     * const { count } = await prisma.leave_types.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends leave_typesDeleteManyArgs>(args?: SelectSubset<T, leave_typesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leave_types
     * const leave_types = await prisma.leave_types.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends leave_typesUpdateManyArgs>(args: SelectSubset<T, leave_typesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leave_types and returns the data updated in the database.
     * @param {leave_typesUpdateManyAndReturnArgs} args - Arguments to update many Leave_types.
     * @example
     * // Update many Leave_types
     * const leave_types = await prisma.leave_types.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leave_types and only return the `id`
     * const leave_typesWithIdOnly = await prisma.leave_types.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends leave_typesUpdateManyAndReturnArgs>(args: SelectSubset<T, leave_typesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Leave_types.
     * @param {leave_typesUpsertArgs} args - Arguments to update or create a Leave_types.
     * @example
     * // Update or create a Leave_types
     * const leave_types = await prisma.leave_types.upsert({
     *   create: {
     *     // ... data to create a Leave_types
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave_types we want to update
     *   }
     * })
     */
    upsert<T extends leave_typesUpsertArgs>(args: SelectSubset<T, leave_typesUpsertArgs<ExtArgs>>): Prisma__leave_typesClient<$Result.GetResult<Prisma.$leave_typesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesCountArgs} args - Arguments to filter Leave_types to count.
     * @example
     * // Count the number of Leave_types
     * const count = await prisma.leave_types.count({
     *   where: {
     *     // ... the filter for the Leave_types we want to count
     *   }
     * })
    **/
    count<T extends leave_typesCountArgs>(
      args?: Subset<T, leave_typesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Leave_typesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Leave_typesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Leave_typesAggregateArgs>(args: Subset<T, Leave_typesAggregateArgs>): Prisma.PrismaPromise<GetLeave_typesAggregateType<T>>

    /**
     * Group by Leave_types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {leave_typesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends leave_typesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: leave_typesGroupByArgs['orderBy'] }
        : { orderBy?: leave_typesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, leave_typesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeave_typesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the leave_types model
   */
  readonly fields: leave_typesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for leave_types.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__leave_typesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave_balances<T extends leave_types$leave_balancesArgs<ExtArgs> = {}>(args?: Subset<T, leave_types$leave_balancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leave_requests<T extends leave_types$leave_requestsArgs<ExtArgs> = {}>(args?: Subset<T, leave_types$leave_requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the leave_types model
   */
  interface leave_typesFieldRefs {
    readonly id: FieldRef<"leave_types", 'String'>
    readonly name: FieldRef<"leave_types", 'String'>
    readonly description: FieldRef<"leave_types", 'String'>
    readonly defaultDays: FieldRef<"leave_types", 'Int'>
    readonly isCarryForward: FieldRef<"leave_types", 'Boolean'>
    readonly maxCarryForwardDays: FieldRef<"leave_types", 'Int'>
    readonly isActive: FieldRef<"leave_types", 'Boolean'>
    readonly applicableGender: FieldRef<"leave_types", 'String'>
    readonly isHalfDayAllowed: FieldRef<"leave_types", 'Boolean'>
    readonly isPaidLeave: FieldRef<"leave_types", 'Boolean'>
    readonly createdAt: FieldRef<"leave_types", 'DateTime'>
    readonly updatedAt: FieldRef<"leave_types", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * leave_types findUnique
   */
  export type leave_typesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types findUniqueOrThrow
   */
  export type leave_typesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types findFirst
   */
  export type leave_typesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_types.
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_types.
     */
    distinct?: Leave_typesScalarFieldEnum | Leave_typesScalarFieldEnum[]
  }

  /**
   * leave_types findFirstOrThrow
   */
  export type leave_typesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for leave_types.
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of leave_types.
     */
    distinct?: Leave_typesScalarFieldEnum | Leave_typesScalarFieldEnum[]
  }

  /**
   * leave_types findMany
   */
  export type leave_typesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter, which leave_types to fetch.
     */
    where?: leave_typesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of leave_types to fetch.
     */
    orderBy?: leave_typesOrderByWithRelationInput | leave_typesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing leave_types.
     */
    cursor?: leave_typesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` leave_types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` leave_types.
     */
    skip?: number
    distinct?: Leave_typesScalarFieldEnum | Leave_typesScalarFieldEnum[]
  }

  /**
   * leave_types create
   */
  export type leave_typesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * The data needed to create a leave_types.
     */
    data: XOR<leave_typesCreateInput, leave_typesUncheckedCreateInput>
  }

  /**
   * leave_types createMany
   */
  export type leave_typesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many leave_types.
     */
    data: leave_typesCreateManyInput | leave_typesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_types createManyAndReturn
   */
  export type leave_typesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * The data used to create many leave_types.
     */
    data: leave_typesCreateManyInput | leave_typesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * leave_types update
   */
  export type leave_typesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * The data needed to update a leave_types.
     */
    data: XOR<leave_typesUpdateInput, leave_typesUncheckedUpdateInput>
    /**
     * Choose, which leave_types to update.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types updateMany
   */
  export type leave_typesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update leave_types.
     */
    data: XOR<leave_typesUpdateManyMutationInput, leave_typesUncheckedUpdateManyInput>
    /**
     * Filter which leave_types to update
     */
    where?: leave_typesWhereInput
    /**
     * Limit how many leave_types to update.
     */
    limit?: number
  }

  /**
   * leave_types updateManyAndReturn
   */
  export type leave_typesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * The data used to update leave_types.
     */
    data: XOR<leave_typesUpdateManyMutationInput, leave_typesUncheckedUpdateManyInput>
    /**
     * Filter which leave_types to update
     */
    where?: leave_typesWhereInput
    /**
     * Limit how many leave_types to update.
     */
    limit?: number
  }

  /**
   * leave_types upsert
   */
  export type leave_typesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * The filter to search for the leave_types to update in case it exists.
     */
    where: leave_typesWhereUniqueInput
    /**
     * In case the leave_types found by the `where` argument doesn't exist, create a new leave_types with this data.
     */
    create: XOR<leave_typesCreateInput, leave_typesUncheckedCreateInput>
    /**
     * In case the leave_types was found with the provided `where` argument, update it with this data.
     */
    update: XOR<leave_typesUpdateInput, leave_typesUncheckedUpdateInput>
  }

  /**
   * leave_types delete
   */
  export type leave_typesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
    /**
     * Filter which leave_types to delete.
     */
    where: leave_typesWhereUniqueInput
  }

  /**
   * leave_types deleteMany
   */
  export type leave_typesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which leave_types to delete
     */
    where?: leave_typesWhereInput
    /**
     * Limit how many leave_types to delete.
     */
    limit?: number
  }

  /**
   * leave_types.leave_balances
   */
  export type leave_types$leave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    where?: leave_balancesWhereInput
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    cursor?: leave_balancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * leave_types.leave_requests
   */
  export type leave_types$leave_requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    cursor?: leave_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * leave_types without action
   */
  export type leave_typesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_types
     */
    select?: leave_typesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_types
     */
    omit?: leave_typesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_typesInclude<ExtArgs> | null
  }


  /**
   * Model migrations
   */

  export type AggregateMigrations = {
    _count: MigrationsCountAggregateOutputType | null
    _avg: MigrationsAvgAggregateOutputType | null
    _sum: MigrationsSumAggregateOutputType | null
    _min: MigrationsMinAggregateOutputType | null
    _max: MigrationsMaxAggregateOutputType | null
  }

  export type MigrationsAvgAggregateOutputType = {
    id: number | null
    timestamp: number | null
  }

  export type MigrationsSumAggregateOutputType = {
    id: number | null
    timestamp: bigint | null
  }

  export type MigrationsMinAggregateOutputType = {
    id: number | null
    timestamp: bigint | null
    name: string | null
  }

  export type MigrationsMaxAggregateOutputType = {
    id: number | null
    timestamp: bigint | null
    name: string | null
  }

  export type MigrationsCountAggregateOutputType = {
    id: number
    timestamp: number
    name: number
    _all: number
  }


  export type MigrationsAvgAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type MigrationsSumAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type MigrationsMinAggregateInputType = {
    id?: true
    timestamp?: true
    name?: true
  }

  export type MigrationsMaxAggregateInputType = {
    id?: true
    timestamp?: true
    name?: true
  }

  export type MigrationsCountAggregateInputType = {
    id?: true
    timestamp?: true
    name?: true
    _all?: true
  }

  export type MigrationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which migrations to aggregate.
     */
    where?: migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations to fetch.
     */
    orderBy?: migrationsOrderByWithRelationInput | migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned migrations
    **/
    _count?: true | MigrationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MigrationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MigrationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MigrationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MigrationsMaxAggregateInputType
  }

  export type GetMigrationsAggregateType<T extends MigrationsAggregateArgs> = {
        [P in keyof T & keyof AggregateMigrations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMigrations[P]>
      : GetScalarType<T[P], AggregateMigrations[P]>
  }




  export type migrationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: migrationsWhereInput
    orderBy?: migrationsOrderByWithAggregationInput | migrationsOrderByWithAggregationInput[]
    by: MigrationsScalarFieldEnum[] | MigrationsScalarFieldEnum
    having?: migrationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MigrationsCountAggregateInputType | true
    _avg?: MigrationsAvgAggregateInputType
    _sum?: MigrationsSumAggregateInputType
    _min?: MigrationsMinAggregateInputType
    _max?: MigrationsMaxAggregateInputType
  }

  export type MigrationsGroupByOutputType = {
    id: number
    timestamp: bigint
    name: string
    _count: MigrationsCountAggregateOutputType | null
    _avg: MigrationsAvgAggregateOutputType | null
    _sum: MigrationsSumAggregateOutputType | null
    _min: MigrationsMinAggregateOutputType | null
    _max: MigrationsMaxAggregateOutputType | null
  }

  type GetMigrationsGroupByPayload<T extends migrationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MigrationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MigrationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MigrationsGroupByOutputType[P]>
            : GetScalarType<T[P], MigrationsGroupByOutputType[P]>
        }
      >
    >


  export type migrationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    name?: boolean
  }, ExtArgs["result"]["migrations"]>

  export type migrationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    name?: boolean
  }, ExtArgs["result"]["migrations"]>

  export type migrationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    name?: boolean
  }, ExtArgs["result"]["migrations"]>

  export type migrationsSelectScalar = {
    id?: boolean
    timestamp?: boolean
    name?: boolean
  }

  export type migrationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timestamp" | "name", ExtArgs["result"]["migrations"]>

  export type $migrationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "migrations"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      timestamp: bigint
      name: string
    }, ExtArgs["result"]["migrations"]>
    composites: {}
  }

  type migrationsGetPayload<S extends boolean | null | undefined | migrationsDefaultArgs> = $Result.GetResult<Prisma.$migrationsPayload, S>

  type migrationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<migrationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MigrationsCountAggregateInputType | true
    }

  export interface migrationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['migrations'], meta: { name: 'migrations' } }
    /**
     * Find zero or one Migrations that matches the filter.
     * @param {migrationsFindUniqueArgs} args - Arguments to find a Migrations
     * @example
     * // Get one Migrations
     * const migrations = await prisma.migrations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends migrationsFindUniqueArgs>(args: SelectSubset<T, migrationsFindUniqueArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Migrations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {migrationsFindUniqueOrThrowArgs} args - Arguments to find a Migrations
     * @example
     * // Get one Migrations
     * const migrations = await prisma.migrations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends migrationsFindUniqueOrThrowArgs>(args: SelectSubset<T, migrationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrationsFindFirstArgs} args - Arguments to find a Migrations
     * @example
     * // Get one Migrations
     * const migrations = await prisma.migrations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends migrationsFindFirstArgs>(args?: SelectSubset<T, migrationsFindFirstArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migrations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrationsFindFirstOrThrowArgs} args - Arguments to find a Migrations
     * @example
     * // Get one Migrations
     * const migrations = await prisma.migrations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends migrationsFindFirstOrThrowArgs>(args?: SelectSubset<T, migrationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Migrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Migrations
     * const migrations = await prisma.migrations.findMany()
     * 
     * // Get first 10 Migrations
     * const migrations = await prisma.migrations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const migrationsWithIdOnly = await prisma.migrations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends migrationsFindManyArgs>(args?: SelectSubset<T, migrationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Migrations.
     * @param {migrationsCreateArgs} args - Arguments to create a Migrations.
     * @example
     * // Create one Migrations
     * const Migrations = await prisma.migrations.create({
     *   data: {
     *     // ... data to create a Migrations
     *   }
     * })
     * 
     */
    create<T extends migrationsCreateArgs>(args: SelectSubset<T, migrationsCreateArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Migrations.
     * @param {migrationsCreateManyArgs} args - Arguments to create many Migrations.
     * @example
     * // Create many Migrations
     * const migrations = await prisma.migrations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends migrationsCreateManyArgs>(args?: SelectSubset<T, migrationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Migrations and returns the data saved in the database.
     * @param {migrationsCreateManyAndReturnArgs} args - Arguments to create many Migrations.
     * @example
     * // Create many Migrations
     * const migrations = await prisma.migrations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Migrations and only return the `id`
     * const migrationsWithIdOnly = await prisma.migrations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends migrationsCreateManyAndReturnArgs>(args?: SelectSubset<T, migrationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Migrations.
     * @param {migrationsDeleteArgs} args - Arguments to delete one Migrations.
     * @example
     * // Delete one Migrations
     * const Migrations = await prisma.migrations.delete({
     *   where: {
     *     // ... filter to delete one Migrations
     *   }
     * })
     * 
     */
    delete<T extends migrationsDeleteArgs>(args: SelectSubset<T, migrationsDeleteArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Migrations.
     * @param {migrationsUpdateArgs} args - Arguments to update one Migrations.
     * @example
     * // Update one Migrations
     * const migrations = await prisma.migrations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends migrationsUpdateArgs>(args: SelectSubset<T, migrationsUpdateArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Migrations.
     * @param {migrationsDeleteManyArgs} args - Arguments to filter Migrations to delete.
     * @example
     * // Delete a few Migrations
     * const { count } = await prisma.migrations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends migrationsDeleteManyArgs>(args?: SelectSubset<T, migrationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Migrations
     * const migrations = await prisma.migrations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends migrationsUpdateManyArgs>(args: SelectSubset<T, migrationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations and returns the data updated in the database.
     * @param {migrationsUpdateManyAndReturnArgs} args - Arguments to update many Migrations.
     * @example
     * // Update many Migrations
     * const migrations = await prisma.migrations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Migrations and only return the `id`
     * const migrationsWithIdOnly = await prisma.migrations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends migrationsUpdateManyAndReturnArgs>(args: SelectSubset<T, migrationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Migrations.
     * @param {migrationsUpsertArgs} args - Arguments to update or create a Migrations.
     * @example
     * // Update or create a Migrations
     * const migrations = await prisma.migrations.upsert({
     *   create: {
     *     // ... data to create a Migrations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Migrations we want to update
     *   }
     * })
     */
    upsert<T extends migrationsUpsertArgs>(args: SelectSubset<T, migrationsUpsertArgs<ExtArgs>>): Prisma__migrationsClient<$Result.GetResult<Prisma.$migrationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrationsCountArgs} args - Arguments to filter Migrations to count.
     * @example
     * // Count the number of Migrations
     * const count = await prisma.migrations.count({
     *   where: {
     *     // ... the filter for the Migrations we want to count
     *   }
     * })
    **/
    count<T extends migrationsCountArgs>(
      args?: Subset<T, migrationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MigrationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MigrationsAggregateArgs>(args: Subset<T, MigrationsAggregateArgs>): Prisma.PrismaPromise<GetMigrationsAggregateType<T>>

    /**
     * Group by Migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends migrationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: migrationsGroupByArgs['orderBy'] }
        : { orderBy?: migrationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, migrationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMigrationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the migrations model
   */
  readonly fields: migrationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for migrations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__migrationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the migrations model
   */
  interface migrationsFieldRefs {
    readonly id: FieldRef<"migrations", 'Int'>
    readonly timestamp: FieldRef<"migrations", 'BigInt'>
    readonly name: FieldRef<"migrations", 'String'>
  }
    

  // Custom InputTypes
  /**
   * migrations findUnique
   */
  export type migrationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * Filter, which migrations to fetch.
     */
    where: migrationsWhereUniqueInput
  }

  /**
   * migrations findUniqueOrThrow
   */
  export type migrationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * Filter, which migrations to fetch.
     */
    where: migrationsWhereUniqueInput
  }

  /**
   * migrations findFirst
   */
  export type migrationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * Filter, which migrations to fetch.
     */
    where?: migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations to fetch.
     */
    orderBy?: migrationsOrderByWithRelationInput | migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for migrations.
     */
    cursor?: migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of migrations.
     */
    distinct?: MigrationsScalarFieldEnum | MigrationsScalarFieldEnum[]
  }

  /**
   * migrations findFirstOrThrow
   */
  export type migrationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * Filter, which migrations to fetch.
     */
    where?: migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations to fetch.
     */
    orderBy?: migrationsOrderByWithRelationInput | migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for migrations.
     */
    cursor?: migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of migrations.
     */
    distinct?: MigrationsScalarFieldEnum | MigrationsScalarFieldEnum[]
  }

  /**
   * migrations findMany
   */
  export type migrationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * Filter, which migrations to fetch.
     */
    where?: migrationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations to fetch.
     */
    orderBy?: migrationsOrderByWithRelationInput | migrationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing migrations.
     */
    cursor?: migrationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations.
     */
    skip?: number
    distinct?: MigrationsScalarFieldEnum | MigrationsScalarFieldEnum[]
  }

  /**
   * migrations create
   */
  export type migrationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * The data needed to create a migrations.
     */
    data: XOR<migrationsCreateInput, migrationsUncheckedCreateInput>
  }

  /**
   * migrations createMany
   */
  export type migrationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many migrations.
     */
    data: migrationsCreateManyInput | migrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * migrations createManyAndReturn
   */
  export type migrationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * The data used to create many migrations.
     */
    data: migrationsCreateManyInput | migrationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * migrations update
   */
  export type migrationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * The data needed to update a migrations.
     */
    data: XOR<migrationsUpdateInput, migrationsUncheckedUpdateInput>
    /**
     * Choose, which migrations to update.
     */
    where: migrationsWhereUniqueInput
  }

  /**
   * migrations updateMany
   */
  export type migrationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update migrations.
     */
    data: XOR<migrationsUpdateManyMutationInput, migrationsUncheckedUpdateManyInput>
    /**
     * Filter which migrations to update
     */
    where?: migrationsWhereInput
    /**
     * Limit how many migrations to update.
     */
    limit?: number
  }

  /**
   * migrations updateManyAndReturn
   */
  export type migrationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * The data used to update migrations.
     */
    data: XOR<migrationsUpdateManyMutationInput, migrationsUncheckedUpdateManyInput>
    /**
     * Filter which migrations to update
     */
    where?: migrationsWhereInput
    /**
     * Limit how many migrations to update.
     */
    limit?: number
  }

  /**
   * migrations upsert
   */
  export type migrationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * The filter to search for the migrations to update in case it exists.
     */
    where: migrationsWhereUniqueInput
    /**
     * In case the migrations found by the `where` argument doesn't exist, create a new migrations with this data.
     */
    create: XOR<migrationsCreateInput, migrationsUncheckedCreateInput>
    /**
     * In case the migrations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<migrationsUpdateInput, migrationsUncheckedUpdateInput>
  }

  /**
   * migrations delete
   */
  export type migrationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
    /**
     * Filter which migrations to delete.
     */
    where: migrationsWhereUniqueInput
  }

  /**
   * migrations deleteMany
   */
  export type migrationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which migrations to delete
     */
    where?: migrationsWhereInput
    /**
     * Limit how many migrations to delete.
     */
    limit?: number
  }

  /**
   * migrations without action
   */
  export type migrationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations
     */
    select?: migrationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations
     */
    omit?: migrationsOmit<ExtArgs> | null
  }


  /**
   * Model pages
   */

  export type AggregatePages = {
    _count: PagesCountAggregateOutputType | null
    _min: PagesMinAggregateOutputType | null
    _max: PagesMaxAggregateOutputType | null
  }

  export type PagesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    slug: string | null
    isActive: boolean | null
    isSystem: boolean | null
    configuration: string | null
    accessRoles: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PagesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    slug: string | null
    isActive: boolean | null
    isSystem: boolean | null
    configuration: string | null
    accessRoles: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PagesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    slug: number
    isActive: number
    isSystem: number
    configuration: number
    accessRoles: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PagesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    isActive?: true
    isSystem?: true
    configuration?: true
    accessRoles?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PagesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    isActive?: true
    isSystem?: true
    configuration?: true
    accessRoles?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PagesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    slug?: true
    isActive?: true
    isSystem?: true
    configuration?: true
    accessRoles?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pages to aggregate.
     */
    where?: pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pages to fetch.
     */
    orderBy?: pagesOrderByWithRelationInput | pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pages
    **/
    _count?: true | PagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagesMaxAggregateInputType
  }

  export type GetPagesAggregateType<T extends PagesAggregateArgs> = {
        [P in keyof T & keyof AggregatePages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePages[P]>
      : GetScalarType<T[P], AggregatePages[P]>
  }




  export type pagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pagesWhereInput
    orderBy?: pagesOrderByWithAggregationInput | pagesOrderByWithAggregationInput[]
    by: PagesScalarFieldEnum[] | PagesScalarFieldEnum
    having?: pagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagesCountAggregateInputType | true
    _min?: PagesMinAggregateInputType
    _max?: PagesMaxAggregateInputType
  }

  export type PagesGroupByOutputType = {
    id: string
    name: string
    description: string | null
    slug: string
    isActive: boolean
    isSystem: boolean
    configuration: string | null
    accessRoles: string | null
    createdAt: Date
    updatedAt: Date
    _count: PagesCountAggregateOutputType | null
    _min: PagesMinAggregateOutputType | null
    _max: PagesMaxAggregateOutputType | null
  }

  type GetPagesGroupByPayload<T extends pagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagesGroupByOutputType[P]>
            : GetScalarType<T[P], PagesGroupByOutputType[P]>
        }
      >
    >


  export type pagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    isActive?: boolean
    isSystem?: boolean
    configuration?: boolean
    accessRoles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pages"]>

  export type pagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    isActive?: boolean
    isSystem?: boolean
    configuration?: boolean
    accessRoles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pages"]>

  export type pagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    isActive?: boolean
    isSystem?: boolean
    configuration?: boolean
    accessRoles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pages"]>

  export type pagesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    slug?: boolean
    isActive?: boolean
    isSystem?: boolean
    configuration?: boolean
    accessRoles?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type pagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "slug" | "isActive" | "isSystem" | "configuration" | "accessRoles" | "createdAt" | "updatedAt", ExtArgs["result"]["pages"]>

  export type $pagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      slug: string
      isActive: boolean
      isSystem: boolean
      configuration: string | null
      accessRoles: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pages"]>
    composites: {}
  }

  type pagesGetPayload<S extends boolean | null | undefined | pagesDefaultArgs> = $Result.GetResult<Prisma.$pagesPayload, S>

  type pagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagesCountAggregateInputType | true
    }

  export interface pagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pages'], meta: { name: 'pages' } }
    /**
     * Find zero or one Pages that matches the filter.
     * @param {pagesFindUniqueArgs} args - Arguments to find a Pages
     * @example
     * // Get one Pages
     * const pages = await prisma.pages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pagesFindUniqueArgs>(args: SelectSubset<T, pagesFindUniqueArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pagesFindUniqueOrThrowArgs} args - Arguments to find a Pages
     * @example
     * // Get one Pages
     * const pages = await prisma.pages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pagesFindUniqueOrThrowArgs>(args: SelectSubset<T, pagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagesFindFirstArgs} args - Arguments to find a Pages
     * @example
     * // Get one Pages
     * const pages = await prisma.pages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pagesFindFirstArgs>(args?: SelectSubset<T, pagesFindFirstArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagesFindFirstOrThrowArgs} args - Arguments to find a Pages
     * @example
     * // Get one Pages
     * const pages = await prisma.pages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pagesFindFirstOrThrowArgs>(args?: SelectSubset<T, pagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.pages.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.pages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagesWithIdOnly = await prisma.pages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pagesFindManyArgs>(args?: SelectSubset<T, pagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pages.
     * @param {pagesCreateArgs} args - Arguments to create a Pages.
     * @example
     * // Create one Pages
     * const Pages = await prisma.pages.create({
     *   data: {
     *     // ... data to create a Pages
     *   }
     * })
     * 
     */
    create<T extends pagesCreateArgs>(args: SelectSubset<T, pagesCreateArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {pagesCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const pages = await prisma.pages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pagesCreateManyArgs>(args?: SelectSubset<T, pagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {pagesCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const pages = await prisma.pages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pagesWithIdOnly = await prisma.pages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends pagesCreateManyAndReturnArgs>(args?: SelectSubset<T, pagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pages.
     * @param {pagesDeleteArgs} args - Arguments to delete one Pages.
     * @example
     * // Delete one Pages
     * const Pages = await prisma.pages.delete({
     *   where: {
     *     // ... filter to delete one Pages
     *   }
     * })
     * 
     */
    delete<T extends pagesDeleteArgs>(args: SelectSubset<T, pagesDeleteArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pages.
     * @param {pagesUpdateArgs} args - Arguments to update one Pages.
     * @example
     * // Update one Pages
     * const pages = await prisma.pages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pagesUpdateArgs>(args: SelectSubset<T, pagesUpdateArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {pagesDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.pages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pagesDeleteManyArgs>(args?: SelectSubset<T, pagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const pages = await prisma.pages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pagesUpdateManyArgs>(args: SelectSubset<T, pagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {pagesUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const pages = await prisma.pages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `id`
     * const pagesWithIdOnly = await prisma.pages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends pagesUpdateManyAndReturnArgs>(args: SelectSubset<T, pagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pages.
     * @param {pagesUpsertArgs} args - Arguments to update or create a Pages.
     * @example
     * // Update or create a Pages
     * const pages = await prisma.pages.upsert({
     *   create: {
     *     // ... data to create a Pages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pages we want to update
     *   }
     * })
     */
    upsert<T extends pagesUpsertArgs>(args: SelectSubset<T, pagesUpsertArgs<ExtArgs>>): Prisma__pagesClient<$Result.GetResult<Prisma.$pagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagesCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.pages.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends pagesCountArgs>(
      args?: Subset<T, pagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagesAggregateArgs>(args: Subset<T, PagesAggregateArgs>): Prisma.PrismaPromise<GetPagesAggregateType<T>>

    /**
     * Group by Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pagesGroupByArgs['orderBy'] }
        : { orderBy?: pagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pages model
   */
  readonly fields: pagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pages model
   */
  interface pagesFieldRefs {
    readonly id: FieldRef<"pages", 'String'>
    readonly name: FieldRef<"pages", 'String'>
    readonly description: FieldRef<"pages", 'String'>
    readonly slug: FieldRef<"pages", 'String'>
    readonly isActive: FieldRef<"pages", 'Boolean'>
    readonly isSystem: FieldRef<"pages", 'Boolean'>
    readonly configuration: FieldRef<"pages", 'String'>
    readonly accessRoles: FieldRef<"pages", 'String'>
    readonly createdAt: FieldRef<"pages", 'DateTime'>
    readonly updatedAt: FieldRef<"pages", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * pages findUnique
   */
  export type pagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * Filter, which pages to fetch.
     */
    where: pagesWhereUniqueInput
  }

  /**
   * pages findUniqueOrThrow
   */
  export type pagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * Filter, which pages to fetch.
     */
    where: pagesWhereUniqueInput
  }

  /**
   * pages findFirst
   */
  export type pagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * Filter, which pages to fetch.
     */
    where?: pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pages to fetch.
     */
    orderBy?: pagesOrderByWithRelationInput | pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pages.
     */
    cursor?: pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pages.
     */
    distinct?: PagesScalarFieldEnum | PagesScalarFieldEnum[]
  }

  /**
   * pages findFirstOrThrow
   */
  export type pagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * Filter, which pages to fetch.
     */
    where?: pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pages to fetch.
     */
    orderBy?: pagesOrderByWithRelationInput | pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pages.
     */
    cursor?: pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pages.
     */
    distinct?: PagesScalarFieldEnum | PagesScalarFieldEnum[]
  }

  /**
   * pages findMany
   */
  export type pagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * Filter, which pages to fetch.
     */
    where?: pagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pages to fetch.
     */
    orderBy?: pagesOrderByWithRelationInput | pagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pages.
     */
    cursor?: pagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pages.
     */
    skip?: number
    distinct?: PagesScalarFieldEnum | PagesScalarFieldEnum[]
  }

  /**
   * pages create
   */
  export type pagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * The data needed to create a pages.
     */
    data: XOR<pagesCreateInput, pagesUncheckedCreateInput>
  }

  /**
   * pages createMany
   */
  export type pagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pages.
     */
    data: pagesCreateManyInput | pagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pages createManyAndReturn
   */
  export type pagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * The data used to create many pages.
     */
    data: pagesCreateManyInput | pagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pages update
   */
  export type pagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * The data needed to update a pages.
     */
    data: XOR<pagesUpdateInput, pagesUncheckedUpdateInput>
    /**
     * Choose, which pages to update.
     */
    where: pagesWhereUniqueInput
  }

  /**
   * pages updateMany
   */
  export type pagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pages.
     */
    data: XOR<pagesUpdateManyMutationInput, pagesUncheckedUpdateManyInput>
    /**
     * Filter which pages to update
     */
    where?: pagesWhereInput
    /**
     * Limit how many pages to update.
     */
    limit?: number
  }

  /**
   * pages updateManyAndReturn
   */
  export type pagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * The data used to update pages.
     */
    data: XOR<pagesUpdateManyMutationInput, pagesUncheckedUpdateManyInput>
    /**
     * Filter which pages to update
     */
    where?: pagesWhereInput
    /**
     * Limit how many pages to update.
     */
    limit?: number
  }

  /**
   * pages upsert
   */
  export type pagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * The filter to search for the pages to update in case it exists.
     */
    where: pagesWhereUniqueInput
    /**
     * In case the pages found by the `where` argument doesn't exist, create a new pages with this data.
     */
    create: XOR<pagesCreateInput, pagesUncheckedCreateInput>
    /**
     * In case the pages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pagesUpdateInput, pagesUncheckedUpdateInput>
  }

  /**
   * pages delete
   */
  export type pagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
    /**
     * Filter which pages to delete.
     */
    where: pagesWhereUniqueInput
  }

  /**
   * pages deleteMany
   */
  export type pagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pages to delete
     */
    where?: pagesWhereInput
    /**
     * Limit how many pages to delete.
     */
    limit?: number
  }

  /**
   * pages without action
   */
  export type pagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pages
     */
    select?: pagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pages
     */
    omit?: pagesOmit<ExtArgs> | null
  }


  /**
   * Model positions
   */

  export type AggregatePositions = {
    _count: PositionsCountAggregateOutputType | null
    _avg: PositionsAvgAggregateOutputType | null
    _sum: PositionsSumAggregateOutputType | null
    _min: PositionsMinAggregateOutputType | null
    _max: PositionsMaxAggregateOutputType | null
  }

  export type PositionsAvgAggregateOutputType = {
    level: number | null
  }

  export type PositionsSumAggregateOutputType = {
    level: number | null
  }

  export type PositionsMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    departmentId: string | null
    level: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PositionsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    departmentId: string | null
    level: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PositionsCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    departmentId: number
    level: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PositionsAvgAggregateInputType = {
    level?: true
  }

  export type PositionsSumAggregateInputType = {
    level?: true
  }

  export type PositionsMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    departmentId?: true
    level?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PositionsMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    departmentId?: true
    level?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PositionsCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    departmentId?: true
    level?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PositionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which positions to aggregate.
     */
    where?: positionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of positions to fetch.
     */
    orderBy?: positionsOrderByWithRelationInput | positionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: positionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned positions
    **/
    _count?: true | PositionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PositionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PositionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PositionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PositionsMaxAggregateInputType
  }

  export type GetPositionsAggregateType<T extends PositionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePositions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePositions[P]>
      : GetScalarType<T[P], AggregatePositions[P]>
  }




  export type positionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: positionsWhereInput
    orderBy?: positionsOrderByWithAggregationInput | positionsOrderByWithAggregationInput[]
    by: PositionsScalarFieldEnum[] | PositionsScalarFieldEnum
    having?: positionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PositionsCountAggregateInputType | true
    _avg?: PositionsAvgAggregateInputType
    _sum?: PositionsSumAggregateInputType
    _min?: PositionsMinAggregateInputType
    _max?: PositionsMaxAggregateInputType
  }

  export type PositionsGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    departmentId: string | null
    level: number
    createdAt: Date
    updatedAt: Date
    _count: PositionsCountAggregateOutputType | null
    _avg: PositionsAvgAggregateOutputType | null
    _sum: PositionsSumAggregateOutputType | null
    _min: PositionsMinAggregateOutputType | null
    _max: PositionsMaxAggregateOutputType | null
  }

  type GetPositionsGroupByPayload<T extends positionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PositionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PositionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PositionsGroupByOutputType[P]>
            : GetScalarType<T[P], PositionsGroupByOutputType[P]>
        }
      >
    >


  export type positionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    departmentId?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    departments?: boolean | positions$departmentsArgs<ExtArgs>
    users?: boolean | positions$usersArgs<ExtArgs>
    _count?: boolean | PositionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["positions"]>

  export type positionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    departmentId?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    departments?: boolean | positions$departmentsArgs<ExtArgs>
  }, ExtArgs["result"]["positions"]>

  export type positionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    departmentId?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    departments?: boolean | positions$departmentsArgs<ExtArgs>
  }, ExtArgs["result"]["positions"]>

  export type positionsSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    departmentId?: boolean
    level?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type positionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "departmentId" | "level" | "createdAt" | "updatedAt", ExtArgs["result"]["positions"]>
  export type positionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | positions$departmentsArgs<ExtArgs>
    users?: boolean | positions$usersArgs<ExtArgs>
    _count?: boolean | PositionsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type positionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | positions$departmentsArgs<ExtArgs>
  }
  export type positionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments?: boolean | positions$departmentsArgs<ExtArgs>
  }

  export type $positionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "positions"
    objects: {
      departments: Prisma.$departmentsPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      departmentId: string | null
      level: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["positions"]>
    composites: {}
  }

  type positionsGetPayload<S extends boolean | null | undefined | positionsDefaultArgs> = $Result.GetResult<Prisma.$positionsPayload, S>

  type positionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<positionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PositionsCountAggregateInputType | true
    }

  export interface positionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['positions'], meta: { name: 'positions' } }
    /**
     * Find zero or one Positions that matches the filter.
     * @param {positionsFindUniqueArgs} args - Arguments to find a Positions
     * @example
     * // Get one Positions
     * const positions = await prisma.positions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends positionsFindUniqueArgs>(args: SelectSubset<T, positionsFindUniqueArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Positions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {positionsFindUniqueOrThrowArgs} args - Arguments to find a Positions
     * @example
     * // Get one Positions
     * const positions = await prisma.positions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends positionsFindUniqueOrThrowArgs>(args: SelectSubset<T, positionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {positionsFindFirstArgs} args - Arguments to find a Positions
     * @example
     * // Get one Positions
     * const positions = await prisma.positions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends positionsFindFirstArgs>(args?: SelectSubset<T, positionsFindFirstArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Positions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {positionsFindFirstOrThrowArgs} args - Arguments to find a Positions
     * @example
     * // Get one Positions
     * const positions = await prisma.positions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends positionsFindFirstOrThrowArgs>(args?: SelectSubset<T, positionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Positions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {positionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Positions
     * const positions = await prisma.positions.findMany()
     * 
     * // Get first 10 Positions
     * const positions = await prisma.positions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const positionsWithIdOnly = await prisma.positions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends positionsFindManyArgs>(args?: SelectSubset<T, positionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Positions.
     * @param {positionsCreateArgs} args - Arguments to create a Positions.
     * @example
     * // Create one Positions
     * const Positions = await prisma.positions.create({
     *   data: {
     *     // ... data to create a Positions
     *   }
     * })
     * 
     */
    create<T extends positionsCreateArgs>(args: SelectSubset<T, positionsCreateArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Positions.
     * @param {positionsCreateManyArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const positions = await prisma.positions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends positionsCreateManyArgs>(args?: SelectSubset<T, positionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Positions and returns the data saved in the database.
     * @param {positionsCreateManyAndReturnArgs} args - Arguments to create many Positions.
     * @example
     * // Create many Positions
     * const positions = await prisma.positions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Positions and only return the `id`
     * const positionsWithIdOnly = await prisma.positions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends positionsCreateManyAndReturnArgs>(args?: SelectSubset<T, positionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Positions.
     * @param {positionsDeleteArgs} args - Arguments to delete one Positions.
     * @example
     * // Delete one Positions
     * const Positions = await prisma.positions.delete({
     *   where: {
     *     // ... filter to delete one Positions
     *   }
     * })
     * 
     */
    delete<T extends positionsDeleteArgs>(args: SelectSubset<T, positionsDeleteArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Positions.
     * @param {positionsUpdateArgs} args - Arguments to update one Positions.
     * @example
     * // Update one Positions
     * const positions = await prisma.positions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends positionsUpdateArgs>(args: SelectSubset<T, positionsUpdateArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Positions.
     * @param {positionsDeleteManyArgs} args - Arguments to filter Positions to delete.
     * @example
     * // Delete a few Positions
     * const { count } = await prisma.positions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends positionsDeleteManyArgs>(args?: SelectSubset<T, positionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {positionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Positions
     * const positions = await prisma.positions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends positionsUpdateManyArgs>(args: SelectSubset<T, positionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Positions and returns the data updated in the database.
     * @param {positionsUpdateManyAndReturnArgs} args - Arguments to update many Positions.
     * @example
     * // Update many Positions
     * const positions = await prisma.positions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Positions and only return the `id`
     * const positionsWithIdOnly = await prisma.positions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends positionsUpdateManyAndReturnArgs>(args: SelectSubset<T, positionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Positions.
     * @param {positionsUpsertArgs} args - Arguments to update or create a Positions.
     * @example
     * // Update or create a Positions
     * const positions = await prisma.positions.upsert({
     *   create: {
     *     // ... data to create a Positions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Positions we want to update
     *   }
     * })
     */
    upsert<T extends positionsUpsertArgs>(args: SelectSubset<T, positionsUpsertArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {positionsCountArgs} args - Arguments to filter Positions to count.
     * @example
     * // Count the number of Positions
     * const count = await prisma.positions.count({
     *   where: {
     *     // ... the filter for the Positions we want to count
     *   }
     * })
    **/
    count<T extends positionsCountArgs>(
      args?: Subset<T, positionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PositionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PositionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PositionsAggregateArgs>(args: Subset<T, PositionsAggregateArgs>): Prisma.PrismaPromise<GetPositionsAggregateType<T>>

    /**
     * Group by Positions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {positionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends positionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: positionsGroupByArgs['orderBy'] }
        : { orderBy?: positionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, positionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPositionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the positions model
   */
  readonly fields: positionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for positions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__positionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    departments<T extends positions$departmentsArgs<ExtArgs> = {}>(args?: Subset<T, positions$departmentsArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends positions$usersArgs<ExtArgs> = {}>(args?: Subset<T, positions$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the positions model
   */
  interface positionsFieldRefs {
    readonly id: FieldRef<"positions", 'String'>
    readonly name: FieldRef<"positions", 'String'>
    readonly description: FieldRef<"positions", 'String'>
    readonly isActive: FieldRef<"positions", 'Boolean'>
    readonly departmentId: FieldRef<"positions", 'String'>
    readonly level: FieldRef<"positions", 'Int'>
    readonly createdAt: FieldRef<"positions", 'DateTime'>
    readonly updatedAt: FieldRef<"positions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * positions findUnique
   */
  export type positionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * Filter, which positions to fetch.
     */
    where: positionsWhereUniqueInput
  }

  /**
   * positions findUniqueOrThrow
   */
  export type positionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * Filter, which positions to fetch.
     */
    where: positionsWhereUniqueInput
  }

  /**
   * positions findFirst
   */
  export type positionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * Filter, which positions to fetch.
     */
    where?: positionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of positions to fetch.
     */
    orderBy?: positionsOrderByWithRelationInput | positionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for positions.
     */
    cursor?: positionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of positions.
     */
    distinct?: PositionsScalarFieldEnum | PositionsScalarFieldEnum[]
  }

  /**
   * positions findFirstOrThrow
   */
  export type positionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * Filter, which positions to fetch.
     */
    where?: positionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of positions to fetch.
     */
    orderBy?: positionsOrderByWithRelationInput | positionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for positions.
     */
    cursor?: positionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` positions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of positions.
     */
    distinct?: PositionsScalarFieldEnum | PositionsScalarFieldEnum[]
  }

  /**
   * positions findMany
   */
  export type positionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * Filter, which positions to fetch.
     */
    where?: positionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of positions to fetch.
     */
    orderBy?: positionsOrderByWithRelationInput | positionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing positions.
     */
    cursor?: positionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` positions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` positions.
     */
    skip?: number
    distinct?: PositionsScalarFieldEnum | PositionsScalarFieldEnum[]
  }

  /**
   * positions create
   */
  export type positionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * The data needed to create a positions.
     */
    data: XOR<positionsCreateInput, positionsUncheckedCreateInput>
  }

  /**
   * positions createMany
   */
  export type positionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many positions.
     */
    data: positionsCreateManyInput | positionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * positions createManyAndReturn
   */
  export type positionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * The data used to create many positions.
     */
    data: positionsCreateManyInput | positionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * positions update
   */
  export type positionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * The data needed to update a positions.
     */
    data: XOR<positionsUpdateInput, positionsUncheckedUpdateInput>
    /**
     * Choose, which positions to update.
     */
    where: positionsWhereUniqueInput
  }

  /**
   * positions updateMany
   */
  export type positionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update positions.
     */
    data: XOR<positionsUpdateManyMutationInput, positionsUncheckedUpdateManyInput>
    /**
     * Filter which positions to update
     */
    where?: positionsWhereInput
    /**
     * Limit how many positions to update.
     */
    limit?: number
  }

  /**
   * positions updateManyAndReturn
   */
  export type positionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * The data used to update positions.
     */
    data: XOR<positionsUpdateManyMutationInput, positionsUncheckedUpdateManyInput>
    /**
     * Filter which positions to update
     */
    where?: positionsWhereInput
    /**
     * Limit how many positions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * positions upsert
   */
  export type positionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * The filter to search for the positions to update in case it exists.
     */
    where: positionsWhereUniqueInput
    /**
     * In case the positions found by the `where` argument doesn't exist, create a new positions with this data.
     */
    create: XOR<positionsCreateInput, positionsUncheckedCreateInput>
    /**
     * In case the positions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<positionsUpdateInput, positionsUncheckedUpdateInput>
  }

  /**
   * positions delete
   */
  export type positionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    /**
     * Filter which positions to delete.
     */
    where: positionsWhereUniqueInput
  }

  /**
   * positions deleteMany
   */
  export type positionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which positions to delete
     */
    where?: positionsWhereInput
    /**
     * Limit how many positions to delete.
     */
    limit?: number
  }

  /**
   * positions.departments
   */
  export type positions$departmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    where?: departmentsWhereInput
  }

  /**
   * positions.users
   */
  export type positions$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * positions without action
   */
  export type positionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
  }


  /**
   * Model roles
   */

  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    permissions: string | null
    isSystem: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RolesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    permissions: string | null
    isSystem: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    permissions: number
    isSystem: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RolesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    permissions?: true
    isSystem?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    permissions?: true
    isSystem?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    permissions?: true
    isSystem?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which roles to aggregate.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type rolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rolesWhereInput
    orderBy?: rolesOrderByWithAggregationInput | rolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: rolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }

  export type RolesGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    permissions: string | null
    isSystem: boolean
    createdAt: Date
    updatedAt: Date
    _count: RolesCountAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends rolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type rolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | roles$usersArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    permissions?: boolean
    isSystem?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type rolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "permissions" | "isSystem" | "createdAt" | "updatedAt", ExtArgs["result"]["roles"]>
  export type rolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | roles$usersArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type rolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type rolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $rolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "roles"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      permissions: string | null
      isSystem: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roles"]>
    composites: {}
  }

  type rolesGetPayload<S extends boolean | null | undefined | rolesDefaultArgs> = $Result.GetResult<Prisma.$rolesPayload, S>

  type rolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface rolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['roles'], meta: { name: 'roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {rolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rolesFindUniqueArgs>(args: SelectSubset<T, rolesFindUniqueArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rolesFindUniqueOrThrowArgs>(args: SelectSubset<T, rolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rolesFindFirstArgs>(args?: SelectSubset<T, rolesFindFirstArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rolesFindFirstOrThrowArgs>(args?: SelectSubset<T, rolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends rolesFindManyArgs>(args?: SelectSubset<T, rolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Roles.
     * @param {rolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
     */
    create<T extends rolesCreateArgs>(args: SelectSubset<T, rolesCreateArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {rolesCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rolesCreateManyArgs>(args?: SelectSubset<T, rolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {rolesCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rolesCreateManyAndReturnArgs>(args?: SelectSubset<T, rolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Roles.
     * @param {rolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
     */
    delete<T extends rolesDeleteArgs>(args: SelectSubset<T, rolesDeleteArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Roles.
     * @param {rolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rolesUpdateArgs>(args: SelectSubset<T, rolesUpdateArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {rolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rolesDeleteManyArgs>(args?: SelectSubset<T, rolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rolesUpdateManyArgs>(args: SelectSubset<T, rolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {rolesUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const rolesWithIdOnly = await prisma.roles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rolesUpdateManyAndReturnArgs>(args: SelectSubset<T, rolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Roles.
     * @param {rolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
     */
    upsert<T extends rolesUpsertArgs>(args: SelectSubset<T, rolesUpsertArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends rolesCountArgs>(
      args?: Subset<T, rolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rolesGroupByArgs['orderBy'] }
        : { orderBy?: rolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the roles model
   */
  readonly fields: rolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends roles$usersArgs<ExtArgs> = {}>(args?: Subset<T, roles$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the roles model
   */
  interface rolesFieldRefs {
    readonly id: FieldRef<"roles", 'String'>
    readonly name: FieldRef<"roles", 'String'>
    readonly description: FieldRef<"roles", 'String'>
    readonly isActive: FieldRef<"roles", 'Boolean'>
    readonly permissions: FieldRef<"roles", 'String'>
    readonly isSystem: FieldRef<"roles", 'Boolean'>
    readonly createdAt: FieldRef<"roles", 'DateTime'>
    readonly updatedAt: FieldRef<"roles", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * roles findUnique
   */
  export type rolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles findUniqueOrThrow
   */
  export type rolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles findFirst
   */
  export type rolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles findFirstOrThrow
   */
  export type rolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles findMany
   */
  export type rolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles create
   */
  export type rolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The data needed to create a roles.
     */
    data: XOR<rolesCreateInput, rolesUncheckedCreateInput>
  }

  /**
   * roles createMany
   */
  export type rolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many roles.
     */
    data: rolesCreateManyInput | rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * roles createManyAndReturn
   */
  export type rolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * The data used to create many roles.
     */
    data: rolesCreateManyInput | rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * roles update
   */
  export type rolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The data needed to update a roles.
     */
    data: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
    /**
     * Choose, which roles to update.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles updateMany
   */
  export type rolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update roles.
     */
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    /**
     * Filter which roles to update
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to update.
     */
    limit?: number
  }

  /**
   * roles updateManyAndReturn
   */
  export type rolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * The data used to update roles.
     */
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    /**
     * Filter which roles to update
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to update.
     */
    limit?: number
  }

  /**
   * roles upsert
   */
  export type rolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The filter to search for the roles to update in case it exists.
     */
    where: rolesWhereUniqueInput
    /**
     * In case the roles found by the `where` argument doesn't exist, create a new roles with this data.
     */
    create: XOR<rolesCreateInput, rolesUncheckedCreateInput>
    /**
     * In case the roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
  }

  /**
   * roles delete
   */
  export type rolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter which roles to delete.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles deleteMany
   */
  export type rolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which roles to delete
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to delete.
     */
    limit?: number
  }

  /**
   * roles.users
   */
  export type roles$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * roles without action
   */
  export type rolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    phoneNumber: string | null
    address: string | null
    role: $Enums.user_role_enum | null
    level: $Enums.user_level_enum | null
    gender: $Enums.gender_enum | null
    managerId: string | null
    department: string | null
    position: string | null
    roleId: string | null
    departmentId: string | null
    positionId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    hrId: string | null
    teamLeadId: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    phoneNumber: string | null
    address: string | null
    role: $Enums.user_role_enum | null
    level: $Enums.user_level_enum | null
    gender: $Enums.gender_enum | null
    managerId: string | null
    department: string | null
    position: string | null
    roleId: string | null
    departmentId: string | null
    positionId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    hrId: string | null
    teamLeadId: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    password: number
    phoneNumber: number
    address: number
    role: number
    level: number
    gender: number
    managerId: number
    department: number
    position: number
    roleId: number
    departmentId: number
    positionId: number
    isActive: number
    createdAt: number
    updatedAt: number
    hrId: number
    teamLeadId: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    phoneNumber?: true
    address?: true
    role?: true
    level?: true
    gender?: true
    managerId?: true
    department?: true
    position?: true
    roleId?: true
    departmentId?: true
    positionId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    hrId?: true
    teamLeadId?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    phoneNumber?: true
    address?: true
    role?: true
    level?: true
    gender?: true
    managerId?: true
    department?: true
    position?: true
    roleId?: true
    departmentId?: true
    positionId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    hrId?: true
    teamLeadId?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    phoneNumber?: true
    address?: true
    role?: true
    level?: true
    gender?: true
    managerId?: true
    department?: true
    position?: true
    roleId?: true
    departmentId?: true
    positionId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    hrId?: true
    teamLeadId?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string | null
    address: string | null
    role: $Enums.user_role_enum
    level: $Enums.user_level_enum
    gender: $Enums.gender_enum | null
    managerId: string | null
    department: string | null
    position: string | null
    roleId: string | null
    departmentId: string | null
    positionId: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    hrId: string | null
    teamLeadId: string | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    address?: boolean
    role?: boolean
    level?: boolean
    gender?: boolean
    managerId?: boolean
    department?: boolean
    position?: boolean
    roleId?: boolean
    departmentId?: boolean
    positionId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hrId?: boolean
    teamLeadId?: boolean
    departments_departments_managerIdTousers?: boolean | users$departments_departments_managerIdTousersArgs<ExtArgs>
    leave_balances?: boolean | users$leave_balancesArgs<ExtArgs>
    leave_requests_leave_requests_approverIdTousers?: boolean | users$leave_requests_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_requests_leave_requests_userIdTousers?: boolean | users$leave_requests_leave_requests_userIdTousersArgs<ExtArgs>
    departments_users_departmentIdTodepartments?: boolean | users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>
    users_users_hrIdTousers?: boolean | users$users_users_hrIdTousersArgs<ExtArgs>
    other_users_users_hrIdTousers?: boolean | users$other_users_users_hrIdTousersArgs<ExtArgs>
    users_users_managerIdTousers?: boolean | users$users_users_managerIdTousersArgs<ExtArgs>
    other_users_users_managerIdTousers?: boolean | users$other_users_users_managerIdTousersArgs<ExtArgs>
    positions?: boolean | users$positionsArgs<ExtArgs>
    roles?: boolean | users$rolesArgs<ExtArgs>
    users_users_teamLeadIdTousers?: boolean | users$users_users_teamLeadIdTousersArgs<ExtArgs>
    other_users_users_teamLeadIdTousers?: boolean | users$other_users_users_teamLeadIdTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    address?: boolean
    role?: boolean
    level?: boolean
    gender?: boolean
    managerId?: boolean
    department?: boolean
    position?: boolean
    roleId?: boolean
    departmentId?: boolean
    positionId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hrId?: boolean
    teamLeadId?: boolean
    departments_users_departmentIdTodepartments?: boolean | users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>
    users_users_hrIdTousers?: boolean | users$users_users_hrIdTousersArgs<ExtArgs>
    users_users_managerIdTousers?: boolean | users$users_users_managerIdTousersArgs<ExtArgs>
    positions?: boolean | users$positionsArgs<ExtArgs>
    roles?: boolean | users$rolesArgs<ExtArgs>
    users_users_teamLeadIdTousers?: boolean | users$users_users_teamLeadIdTousersArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    address?: boolean
    role?: boolean
    level?: boolean
    gender?: boolean
    managerId?: boolean
    department?: boolean
    position?: boolean
    roleId?: boolean
    departmentId?: boolean
    positionId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hrId?: boolean
    teamLeadId?: boolean
    departments_users_departmentIdTodepartments?: boolean | users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>
    users_users_hrIdTousers?: boolean | users$users_users_hrIdTousersArgs<ExtArgs>
    users_users_managerIdTousers?: boolean | users$users_users_managerIdTousersArgs<ExtArgs>
    positions?: boolean | users$positionsArgs<ExtArgs>
    roles?: boolean | users$rolesArgs<ExtArgs>
    users_users_teamLeadIdTousers?: boolean | users$users_users_teamLeadIdTousersArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    phoneNumber?: boolean
    address?: boolean
    role?: boolean
    level?: boolean
    gender?: boolean
    managerId?: boolean
    department?: boolean
    position?: boolean
    roleId?: boolean
    departmentId?: boolean
    positionId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hrId?: boolean
    teamLeadId?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "password" | "phoneNumber" | "address" | "role" | "level" | "gender" | "managerId" | "department" | "position" | "roleId" | "departmentId" | "positionId" | "isActive" | "createdAt" | "updatedAt" | "hrId" | "teamLeadId", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments_departments_managerIdTousers?: boolean | users$departments_departments_managerIdTousersArgs<ExtArgs>
    leave_balances?: boolean | users$leave_balancesArgs<ExtArgs>
    leave_requests_leave_requests_approverIdTousers?: boolean | users$leave_requests_leave_requests_approverIdTousersArgs<ExtArgs>
    leave_requests_leave_requests_userIdTousers?: boolean | users$leave_requests_leave_requests_userIdTousersArgs<ExtArgs>
    departments_users_departmentIdTodepartments?: boolean | users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>
    users_users_hrIdTousers?: boolean | users$users_users_hrIdTousersArgs<ExtArgs>
    other_users_users_hrIdTousers?: boolean | users$other_users_users_hrIdTousersArgs<ExtArgs>
    users_users_managerIdTousers?: boolean | users$users_users_managerIdTousersArgs<ExtArgs>
    other_users_users_managerIdTousers?: boolean | users$other_users_users_managerIdTousersArgs<ExtArgs>
    positions?: boolean | users$positionsArgs<ExtArgs>
    roles?: boolean | users$rolesArgs<ExtArgs>
    users_users_teamLeadIdTousers?: boolean | users$users_users_teamLeadIdTousersArgs<ExtArgs>
    other_users_users_teamLeadIdTousers?: boolean | users$other_users_users_teamLeadIdTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments_users_departmentIdTodepartments?: boolean | users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>
    users_users_hrIdTousers?: boolean | users$users_users_hrIdTousersArgs<ExtArgs>
    users_users_managerIdTousers?: boolean | users$users_users_managerIdTousersArgs<ExtArgs>
    positions?: boolean | users$positionsArgs<ExtArgs>
    roles?: boolean | users$rolesArgs<ExtArgs>
    users_users_teamLeadIdTousers?: boolean | users$users_users_teamLeadIdTousersArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    departments_users_departmentIdTodepartments?: boolean | users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>
    users_users_hrIdTousers?: boolean | users$users_users_hrIdTousersArgs<ExtArgs>
    users_users_managerIdTousers?: boolean | users$users_users_managerIdTousersArgs<ExtArgs>
    positions?: boolean | users$positionsArgs<ExtArgs>
    roles?: boolean | users$rolesArgs<ExtArgs>
    users_users_teamLeadIdTousers?: boolean | users$users_users_teamLeadIdTousersArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      departments_departments_managerIdTousers: Prisma.$departmentsPayload<ExtArgs>[]
      leave_balances: Prisma.$leave_balancesPayload<ExtArgs>[]
      leave_requests_leave_requests_approverIdTousers: Prisma.$leave_requestsPayload<ExtArgs>[]
      leave_requests_leave_requests_userIdTousers: Prisma.$leave_requestsPayload<ExtArgs>[]
      departments_users_departmentIdTodepartments: Prisma.$departmentsPayload<ExtArgs> | null
      users_users_hrIdTousers: Prisma.$usersPayload<ExtArgs> | null
      other_users_users_hrIdTousers: Prisma.$usersPayload<ExtArgs>[]
      users_users_managerIdTousers: Prisma.$usersPayload<ExtArgs> | null
      other_users_users_managerIdTousers: Prisma.$usersPayload<ExtArgs>[]
      positions: Prisma.$positionsPayload<ExtArgs> | null
      roles: Prisma.$rolesPayload<ExtArgs> | null
      users_users_teamLeadIdTousers: Prisma.$usersPayload<ExtArgs> | null
      other_users_users_teamLeadIdTousers: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      password: string
      phoneNumber: string | null
      address: string | null
      role: $Enums.user_role_enum
      level: $Enums.user_level_enum
      gender: $Enums.gender_enum | null
      managerId: string | null
      department: string | null
      position: string | null
      roleId: string | null
      departmentId: string | null
      positionId: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      hrId: string | null
      teamLeadId: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    departments_departments_managerIdTousers<T extends users$departments_departments_managerIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$departments_departments_managerIdTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leave_balances<T extends users$leave_balancesArgs<ExtArgs> = {}>(args?: Subset<T, users$leave_balancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_balancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leave_requests_leave_requests_approverIdTousers<T extends users$leave_requests_leave_requests_approverIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$leave_requests_leave_requests_approverIdTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leave_requests_leave_requests_userIdTousers<T extends users$leave_requests_leave_requests_userIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$leave_requests_leave_requests_userIdTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$leave_requestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    departments_users_departmentIdTodepartments<T extends users$departments_users_departmentIdTodepartmentsArgs<ExtArgs> = {}>(args?: Subset<T, users$departments_users_departmentIdTodepartmentsArgs<ExtArgs>>): Prisma__departmentsClient<$Result.GetResult<Prisma.$departmentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_users_hrIdTousers<T extends users$users_users_hrIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$users_users_hrIdTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_users_users_hrIdTousers<T extends users$other_users_users_hrIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$other_users_users_hrIdTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_users_managerIdTousers<T extends users$users_users_managerIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$users_users_managerIdTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_users_users_managerIdTousers<T extends users$other_users_users_managerIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$other_users_users_managerIdTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    positions<T extends users$positionsArgs<ExtArgs> = {}>(args?: Subset<T, users$positionsArgs<ExtArgs>>): Prisma__positionsClient<$Result.GetResult<Prisma.$positionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    roles<T extends users$rolesArgs<ExtArgs> = {}>(args?: Subset<T, users$rolesArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_users_teamLeadIdTousers<T extends users$users_users_teamLeadIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$users_users_teamLeadIdTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_users_users_teamLeadIdTousers<T extends users$other_users_users_teamLeadIdTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$other_users_users_teamLeadIdTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly firstName: FieldRef<"users", 'String'>
    readonly lastName: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly phoneNumber: FieldRef<"users", 'String'>
    readonly address: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'user_role_enum'>
    readonly level: FieldRef<"users", 'user_level_enum'>
    readonly gender: FieldRef<"users", 'gender_enum'>
    readonly managerId: FieldRef<"users", 'String'>
    readonly department: FieldRef<"users", 'String'>
    readonly position: FieldRef<"users", 'String'>
    readonly roleId: FieldRef<"users", 'String'>
    readonly departmentId: FieldRef<"users", 'String'>
    readonly positionId: FieldRef<"users", 'String'>
    readonly isActive: FieldRef<"users", 'Boolean'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
    readonly hrId: FieldRef<"users", 'String'>
    readonly teamLeadId: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.departments_departments_managerIdTousers
   */
  export type users$departments_departments_managerIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    where?: departmentsWhereInput
    orderBy?: departmentsOrderByWithRelationInput | departmentsOrderByWithRelationInput[]
    cursor?: departmentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DepartmentsScalarFieldEnum | DepartmentsScalarFieldEnum[]
  }

  /**
   * users.leave_balances
   */
  export type users$leave_balancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_balances
     */
    select?: leave_balancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_balances
     */
    omit?: leave_balancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_balancesInclude<ExtArgs> | null
    where?: leave_balancesWhereInput
    orderBy?: leave_balancesOrderByWithRelationInput | leave_balancesOrderByWithRelationInput[]
    cursor?: leave_balancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_balancesScalarFieldEnum | Leave_balancesScalarFieldEnum[]
  }

  /**
   * users.leave_requests_leave_requests_approverIdTousers
   */
  export type users$leave_requests_leave_requests_approverIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    cursor?: leave_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * users.leave_requests_leave_requests_userIdTousers
   */
  export type users$leave_requests_leave_requests_userIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the leave_requests
     */
    select?: leave_requestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the leave_requests
     */
    omit?: leave_requestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: leave_requestsInclude<ExtArgs> | null
    where?: leave_requestsWhereInput
    orderBy?: leave_requestsOrderByWithRelationInput | leave_requestsOrderByWithRelationInput[]
    cursor?: leave_requestsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Leave_requestsScalarFieldEnum | Leave_requestsScalarFieldEnum[]
  }

  /**
   * users.departments_users_departmentIdTodepartments
   */
  export type users$departments_users_departmentIdTodepartmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the departments
     */
    select?: departmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the departments
     */
    omit?: departmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentsInclude<ExtArgs> | null
    where?: departmentsWhereInput
  }

  /**
   * users.users_users_hrIdTousers
   */
  export type users$users_users_hrIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * users.other_users_users_hrIdTousers
   */
  export type users$other_users_users_hrIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users.users_users_managerIdTousers
   */
  export type users$users_users_managerIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * users.other_users_users_managerIdTousers
   */
  export type users$other_users_users_managerIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users.positions
   */
  export type users$positionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the positions
     */
    select?: positionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the positions
     */
    omit?: positionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: positionsInclude<ExtArgs> | null
    where?: positionsWhereInput
  }

  /**
   * users.roles
   */
  export type users$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    where?: rolesWhereInput
  }

  /**
   * users.users_users_teamLeadIdTousers
   */
  export type users$users_users_teamLeadIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * users.other_users_users_teamLeadIdTousers
   */
  export type users$other_users_users_teamLeadIdTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Approval_workflowsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    minDays: 'minDays',
    maxDays: 'maxDays',
    approvalLevels: 'approvalLevels',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Approval_workflowsScalarFieldEnum = (typeof Approval_workflowsScalarFieldEnum)[keyof typeof Approval_workflowsScalarFieldEnum]


  export const DepartmentsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    managerId: 'managerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DepartmentsScalarFieldEnum = (typeof DepartmentsScalarFieldEnum)[keyof typeof DepartmentsScalarFieldEnum]


  export const HolidaysScalarFieldEnum: {
    id: 'id',
    name: 'name',
    date: 'date',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HolidaysScalarFieldEnum = (typeof HolidaysScalarFieldEnum)[keyof typeof HolidaysScalarFieldEnum]


  export const Leave_balancesScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    leaveTypeId: 'leaveTypeId',
    balance: 'balance',
    used: 'used',
    carryForward: 'carryForward',
    year: 'year',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Leave_balancesScalarFieldEnum = (typeof Leave_balancesScalarFieldEnum)[keyof typeof Leave_balancesScalarFieldEnum]


  export const Leave_requestsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    leaveTypeId: 'leaveTypeId',
    startDate: 'startDate',
    endDate: 'endDate',
    requestType: 'requestType',
    numberOfDays: 'numberOfDays',
    reason: 'reason',
    status: 'status',
    approverId: 'approverId',
    approverComments: 'approverComments',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    metadata: 'metadata'
  };

  export type Leave_requestsScalarFieldEnum = (typeof Leave_requestsScalarFieldEnum)[keyof typeof Leave_requestsScalarFieldEnum]


  export const Leave_typesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    defaultDays: 'defaultDays',
    isCarryForward: 'isCarryForward',
    maxCarryForwardDays: 'maxCarryForwardDays',
    isActive: 'isActive',
    applicableGender: 'applicableGender',
    isHalfDayAllowed: 'isHalfDayAllowed',
    isPaidLeave: 'isPaidLeave',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Leave_typesScalarFieldEnum = (typeof Leave_typesScalarFieldEnum)[keyof typeof Leave_typesScalarFieldEnum]


  export const MigrationsScalarFieldEnum: {
    id: 'id',
    timestamp: 'timestamp',
    name: 'name'
  };

  export type MigrationsScalarFieldEnum = (typeof MigrationsScalarFieldEnum)[keyof typeof MigrationsScalarFieldEnum]


  export const PagesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    slug: 'slug',
    isActive: 'isActive',
    isSystem: 'isSystem',
    configuration: 'configuration',
    accessRoles: 'accessRoles',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PagesScalarFieldEnum = (typeof PagesScalarFieldEnum)[keyof typeof PagesScalarFieldEnum]


  export const PositionsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    departmentId: 'departmentId',
    level: 'level',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PositionsScalarFieldEnum = (typeof PositionsScalarFieldEnum)[keyof typeof PositionsScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    permissions: 'permissions',
    isSystem: 'isSystem',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    phoneNumber: 'phoneNumber',
    address: 'address',
    role: 'role',
    level: 'level',
    gender: 'gender',
    managerId: 'managerId',
    department: 'department',
    position: 'position',
    roleId: 'roleId',
    departmentId: 'departmentId',
    positionId: 'positionId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    hrId: 'hrId',
    teamLeadId: 'teamLeadId'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'leave_request_type_enum'
   */
  export type Enumleave_request_type_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'leave_request_type_enum'>
    


  /**
   * Reference to a field of type 'leave_request_type_enum[]'
   */
  export type ListEnumleave_request_type_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'leave_request_type_enum[]'>
    


  /**
   * Reference to a field of type 'leave_request_status_enum'
   */
  export type Enumleave_request_status_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'leave_request_status_enum'>
    


  /**
   * Reference to a field of type 'leave_request_status_enum[]'
   */
  export type ListEnumleave_request_status_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'leave_request_status_enum[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'user_role_enum'
   */
  export type Enumuser_role_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_role_enum'>
    


  /**
   * Reference to a field of type 'user_role_enum[]'
   */
  export type ListEnumuser_role_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_role_enum[]'>
    


  /**
   * Reference to a field of type 'user_level_enum'
   */
  export type Enumuser_level_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_level_enum'>
    


  /**
   * Reference to a field of type 'user_level_enum[]'
   */
  export type ListEnumuser_level_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_level_enum[]'>
    


  /**
   * Reference to a field of type 'gender_enum'
   */
  export type Enumgender_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'gender_enum'>
    


  /**
   * Reference to a field of type 'gender_enum[]'
   */
  export type ListEnumgender_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'gender_enum[]'>
    
  /**
   * Deep Input Types
   */


  export type approval_workflowsWhereInput = {
    AND?: approval_workflowsWhereInput | approval_workflowsWhereInput[]
    OR?: approval_workflowsWhereInput[]
    NOT?: approval_workflowsWhereInput | approval_workflowsWhereInput[]
    id?: UuidFilter<"approval_workflows"> | string
    name?: StringFilter<"approval_workflows"> | string
    minDays?: FloatFilter<"approval_workflows"> | number
    maxDays?: FloatFilter<"approval_workflows"> | number
    approvalLevels?: JsonFilter<"approval_workflows">
    isActive?: BoolFilter<"approval_workflows"> | boolean
    createdAt?: DateTimeFilter<"approval_workflows"> | Date | string
    updatedAt?: DateTimeFilter<"approval_workflows"> | Date | string
  }

  export type approval_workflowsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    approvalLevels?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type approval_workflowsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: approval_workflowsWhereInput | approval_workflowsWhereInput[]
    OR?: approval_workflowsWhereInput[]
    NOT?: approval_workflowsWhereInput | approval_workflowsWhereInput[]
    minDays?: FloatFilter<"approval_workflows"> | number
    maxDays?: FloatFilter<"approval_workflows"> | number
    approvalLevels?: JsonFilter<"approval_workflows">
    isActive?: BoolFilter<"approval_workflows"> | boolean
    createdAt?: DateTimeFilter<"approval_workflows"> | Date | string
    updatedAt?: DateTimeFilter<"approval_workflows"> | Date | string
  }, "id" | "name">

  export type approval_workflowsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    approvalLevels?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: approval_workflowsCountOrderByAggregateInput
    _avg?: approval_workflowsAvgOrderByAggregateInput
    _max?: approval_workflowsMaxOrderByAggregateInput
    _min?: approval_workflowsMinOrderByAggregateInput
    _sum?: approval_workflowsSumOrderByAggregateInput
  }

  export type approval_workflowsScalarWhereWithAggregatesInput = {
    AND?: approval_workflowsScalarWhereWithAggregatesInput | approval_workflowsScalarWhereWithAggregatesInput[]
    OR?: approval_workflowsScalarWhereWithAggregatesInput[]
    NOT?: approval_workflowsScalarWhereWithAggregatesInput | approval_workflowsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"approval_workflows"> | string
    name?: StringWithAggregatesFilter<"approval_workflows"> | string
    minDays?: FloatWithAggregatesFilter<"approval_workflows"> | number
    maxDays?: FloatWithAggregatesFilter<"approval_workflows"> | number
    approvalLevels?: JsonWithAggregatesFilter<"approval_workflows">
    isActive?: BoolWithAggregatesFilter<"approval_workflows"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"approval_workflows"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"approval_workflows"> | Date | string
  }

  export type departmentsWhereInput = {
    AND?: departmentsWhereInput | departmentsWhereInput[]
    OR?: departmentsWhereInput[]
    NOT?: departmentsWhereInput | departmentsWhereInput[]
    id?: UuidFilter<"departments"> | string
    name?: StringFilter<"departments"> | string
    description?: StringNullableFilter<"departments"> | string | null
    isActive?: BoolFilter<"departments"> | boolean
    managerId?: UuidNullableFilter<"departments"> | string | null
    createdAt?: DateTimeFilter<"departments"> | Date | string
    updatedAt?: DateTimeFilter<"departments"> | Date | string
    users_departments_managerIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    positions?: PositionsListRelationFilter
    users_users_departmentIdTodepartments?: UsersListRelationFilter
  }

  export type departmentsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    managerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users_departments_managerIdTousers?: usersOrderByWithRelationInput
    positions?: positionsOrderByRelationAggregateInput
    users_users_departmentIdTodepartments?: usersOrderByRelationAggregateInput
  }

  export type departmentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: departmentsWhereInput | departmentsWhereInput[]
    OR?: departmentsWhereInput[]
    NOT?: departmentsWhereInput | departmentsWhereInput[]
    description?: StringNullableFilter<"departments"> | string | null
    isActive?: BoolFilter<"departments"> | boolean
    managerId?: UuidNullableFilter<"departments"> | string | null
    createdAt?: DateTimeFilter<"departments"> | Date | string
    updatedAt?: DateTimeFilter<"departments"> | Date | string
    users_departments_managerIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    positions?: PositionsListRelationFilter
    users_users_departmentIdTodepartments?: UsersListRelationFilter
  }, "id" | "name">

  export type departmentsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    managerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: departmentsCountOrderByAggregateInput
    _max?: departmentsMaxOrderByAggregateInput
    _min?: departmentsMinOrderByAggregateInput
  }

  export type departmentsScalarWhereWithAggregatesInput = {
    AND?: departmentsScalarWhereWithAggregatesInput | departmentsScalarWhereWithAggregatesInput[]
    OR?: departmentsScalarWhereWithAggregatesInput[]
    NOT?: departmentsScalarWhereWithAggregatesInput | departmentsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"departments"> | string
    name?: StringWithAggregatesFilter<"departments"> | string
    description?: StringNullableWithAggregatesFilter<"departments"> | string | null
    isActive?: BoolWithAggregatesFilter<"departments"> | boolean
    managerId?: UuidNullableWithAggregatesFilter<"departments"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"departments"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"departments"> | Date | string
  }

  export type holidaysWhereInput = {
    AND?: holidaysWhereInput | holidaysWhereInput[]
    OR?: holidaysWhereInput[]
    NOT?: holidaysWhereInput | holidaysWhereInput[]
    id?: UuidFilter<"holidays"> | string
    name?: StringFilter<"holidays"> | string
    date?: DateTimeFilter<"holidays"> | Date | string
    description?: StringNullableFilter<"holidays"> | string | null
    isActive?: BoolFilter<"holidays"> | boolean
    createdAt?: DateTimeFilter<"holidays"> | Date | string
    updatedAt?: DateTimeFilter<"holidays"> | Date | string
  }

  export type holidaysOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type holidaysWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: Date | string
    AND?: holidaysWhereInput | holidaysWhereInput[]
    OR?: holidaysWhereInput[]
    NOT?: holidaysWhereInput | holidaysWhereInput[]
    name?: StringFilter<"holidays"> | string
    description?: StringNullableFilter<"holidays"> | string | null
    isActive?: BoolFilter<"holidays"> | boolean
    createdAt?: DateTimeFilter<"holidays"> | Date | string
    updatedAt?: DateTimeFilter<"holidays"> | Date | string
  }, "id" | "date">

  export type holidaysOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: holidaysCountOrderByAggregateInput
    _max?: holidaysMaxOrderByAggregateInput
    _min?: holidaysMinOrderByAggregateInput
  }

  export type holidaysScalarWhereWithAggregatesInput = {
    AND?: holidaysScalarWhereWithAggregatesInput | holidaysScalarWhereWithAggregatesInput[]
    OR?: holidaysScalarWhereWithAggregatesInput[]
    NOT?: holidaysScalarWhereWithAggregatesInput | holidaysScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"holidays"> | string
    name?: StringWithAggregatesFilter<"holidays"> | string
    date?: DateTimeWithAggregatesFilter<"holidays"> | Date | string
    description?: StringNullableWithAggregatesFilter<"holidays"> | string | null
    isActive?: BoolWithAggregatesFilter<"holidays"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"holidays"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"holidays"> | Date | string
  }

  export type leave_balancesWhereInput = {
    AND?: leave_balancesWhereInput | leave_balancesWhereInput[]
    OR?: leave_balancesWhereInput[]
    NOT?: leave_balancesWhereInput | leave_balancesWhereInput[]
    id?: UuidFilter<"leave_balances"> | string
    userId?: UuidFilter<"leave_balances"> | string
    leaveTypeId?: UuidFilter<"leave_balances"> | string
    balance?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    used?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    year?: IntFilter<"leave_balances"> | number
    createdAt?: DateTimeFilter<"leave_balances"> | Date | string
    updatedAt?: DateTimeFilter<"leave_balances"> | Date | string
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type leave_balancesOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leave_types?: leave_typesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type leave_balancesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_leaveTypeId_year?: leave_balancesUserIdLeaveTypeIdYearCompoundUniqueInput
    AND?: leave_balancesWhereInput | leave_balancesWhereInput[]
    OR?: leave_balancesWhereInput[]
    NOT?: leave_balancesWhereInput | leave_balancesWhereInput[]
    userId?: UuidFilter<"leave_balances"> | string
    leaveTypeId?: UuidFilter<"leave_balances"> | string
    balance?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    used?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    year?: IntFilter<"leave_balances"> | number
    createdAt?: DateTimeFilter<"leave_balances"> | Date | string
    updatedAt?: DateTimeFilter<"leave_balances"> | Date | string
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "userId_leaveTypeId_year">

  export type leave_balancesOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: leave_balancesCountOrderByAggregateInput
    _avg?: leave_balancesAvgOrderByAggregateInput
    _max?: leave_balancesMaxOrderByAggregateInput
    _min?: leave_balancesMinOrderByAggregateInput
    _sum?: leave_balancesSumOrderByAggregateInput
  }

  export type leave_balancesScalarWhereWithAggregatesInput = {
    AND?: leave_balancesScalarWhereWithAggregatesInput | leave_balancesScalarWhereWithAggregatesInput[]
    OR?: leave_balancesScalarWhereWithAggregatesInput[]
    NOT?: leave_balancesScalarWhereWithAggregatesInput | leave_balancesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"leave_balances"> | string
    userId?: UuidWithAggregatesFilter<"leave_balances"> | string
    leaveTypeId?: UuidWithAggregatesFilter<"leave_balances"> | string
    balance?: DecimalWithAggregatesFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    used?: DecimalWithAggregatesFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalWithAggregatesFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    year?: IntWithAggregatesFilter<"leave_balances"> | number
    createdAt?: DateTimeWithAggregatesFilter<"leave_balances"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"leave_balances"> | Date | string
  }

  export type leave_requestsWhereInput = {
    AND?: leave_requestsWhereInput | leave_requestsWhereInput[]
    OR?: leave_requestsWhereInput[]
    NOT?: leave_requestsWhereInput | leave_requestsWhereInput[]
    id?: UuidFilter<"leave_requests"> | string
    userId?: UuidFilter<"leave_requests"> | string
    leaveTypeId?: UuidFilter<"leave_requests"> | string
    startDate?: DateTimeFilter<"leave_requests"> | Date | string
    endDate?: DateTimeFilter<"leave_requests"> | Date | string
    requestType?: Enumleave_request_type_enumFilter<"leave_requests"> | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFilter<"leave_requests"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"leave_requests"> | string
    status?: Enumleave_request_status_enumFilter<"leave_requests"> | $Enums.leave_request_status_enum
    approverId?: UuidNullableFilter<"leave_requests"> | string | null
    approverComments?: StringNullableFilter<"leave_requests"> | string | null
    approvedAt?: DateTimeNullableFilter<"leave_requests"> | Date | string | null
    createdAt?: DateTimeFilter<"leave_requests"> | Date | string
    updatedAt?: DateTimeFilter<"leave_requests"> | Date | string
    metadata?: JsonNullableFilter<"leave_requests">
    users_leave_requests_approverIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users_leave_requests_userIdTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type leave_requestsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requestType?: SortOrder
    numberOfDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    approverId?: SortOrderInput | SortOrder
    approverComments?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    users_leave_requests_approverIdTousers?: usersOrderByWithRelationInput
    leave_types?: leave_typesOrderByWithRelationInput
    users_leave_requests_userIdTousers?: usersOrderByWithRelationInput
  }

  export type leave_requestsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: leave_requestsWhereInput | leave_requestsWhereInput[]
    OR?: leave_requestsWhereInput[]
    NOT?: leave_requestsWhereInput | leave_requestsWhereInput[]
    userId?: UuidFilter<"leave_requests"> | string
    leaveTypeId?: UuidFilter<"leave_requests"> | string
    startDate?: DateTimeFilter<"leave_requests"> | Date | string
    endDate?: DateTimeFilter<"leave_requests"> | Date | string
    requestType?: Enumleave_request_type_enumFilter<"leave_requests"> | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFilter<"leave_requests"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"leave_requests"> | string
    status?: Enumleave_request_status_enumFilter<"leave_requests"> | $Enums.leave_request_status_enum
    approverId?: UuidNullableFilter<"leave_requests"> | string | null
    approverComments?: StringNullableFilter<"leave_requests"> | string | null
    approvedAt?: DateTimeNullableFilter<"leave_requests"> | Date | string | null
    createdAt?: DateTimeFilter<"leave_requests"> | Date | string
    updatedAt?: DateTimeFilter<"leave_requests"> | Date | string
    metadata?: JsonNullableFilter<"leave_requests">
    users_leave_requests_approverIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    leave_types?: XOR<Leave_typesScalarRelationFilter, leave_typesWhereInput>
    users_leave_requests_userIdTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type leave_requestsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requestType?: SortOrder
    numberOfDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    approverId?: SortOrderInput | SortOrder
    approverComments?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: leave_requestsCountOrderByAggregateInput
    _avg?: leave_requestsAvgOrderByAggregateInput
    _max?: leave_requestsMaxOrderByAggregateInput
    _min?: leave_requestsMinOrderByAggregateInput
    _sum?: leave_requestsSumOrderByAggregateInput
  }

  export type leave_requestsScalarWhereWithAggregatesInput = {
    AND?: leave_requestsScalarWhereWithAggregatesInput | leave_requestsScalarWhereWithAggregatesInput[]
    OR?: leave_requestsScalarWhereWithAggregatesInput[]
    NOT?: leave_requestsScalarWhereWithAggregatesInput | leave_requestsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"leave_requests"> | string
    userId?: UuidWithAggregatesFilter<"leave_requests"> | string
    leaveTypeId?: UuidWithAggregatesFilter<"leave_requests"> | string
    startDate?: DateTimeWithAggregatesFilter<"leave_requests"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"leave_requests"> | Date | string
    requestType?: Enumleave_request_type_enumWithAggregatesFilter<"leave_requests"> | $Enums.leave_request_type_enum
    numberOfDays?: DecimalWithAggregatesFilter<"leave_requests"> | Decimal | DecimalJsLike | number | string
    reason?: StringWithAggregatesFilter<"leave_requests"> | string
    status?: Enumleave_request_status_enumWithAggregatesFilter<"leave_requests"> | $Enums.leave_request_status_enum
    approverId?: UuidNullableWithAggregatesFilter<"leave_requests"> | string | null
    approverComments?: StringNullableWithAggregatesFilter<"leave_requests"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"leave_requests"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"leave_requests"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"leave_requests"> | Date | string
    metadata?: JsonNullableWithAggregatesFilter<"leave_requests">
  }

  export type leave_typesWhereInput = {
    AND?: leave_typesWhereInput | leave_typesWhereInput[]
    OR?: leave_typesWhereInput[]
    NOT?: leave_typesWhereInput | leave_typesWhereInput[]
    id?: UuidFilter<"leave_types"> | string
    name?: StringFilter<"leave_types"> | string
    description?: StringFilter<"leave_types"> | string
    defaultDays?: IntFilter<"leave_types"> | number
    isCarryForward?: BoolFilter<"leave_types"> | boolean
    maxCarryForwardDays?: IntFilter<"leave_types"> | number
    isActive?: BoolFilter<"leave_types"> | boolean
    applicableGender?: StringNullableFilter<"leave_types"> | string | null
    isHalfDayAllowed?: BoolFilter<"leave_types"> | boolean
    isPaidLeave?: BoolFilter<"leave_types"> | boolean
    createdAt?: DateTimeFilter<"leave_types"> | Date | string
    updatedAt?: DateTimeFilter<"leave_types"> | Date | string
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests?: Leave_requestsListRelationFilter
  }

  export type leave_typesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    defaultDays?: SortOrder
    isCarryForward?: SortOrder
    maxCarryForwardDays?: SortOrder
    isActive?: SortOrder
    applicableGender?: SortOrderInput | SortOrder
    isHalfDayAllowed?: SortOrder
    isPaidLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leave_balances?: leave_balancesOrderByRelationAggregateInput
    leave_requests?: leave_requestsOrderByRelationAggregateInput
  }

  export type leave_typesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: leave_typesWhereInput | leave_typesWhereInput[]
    OR?: leave_typesWhereInput[]
    NOT?: leave_typesWhereInput | leave_typesWhereInput[]
    description?: StringFilter<"leave_types"> | string
    defaultDays?: IntFilter<"leave_types"> | number
    isCarryForward?: BoolFilter<"leave_types"> | boolean
    maxCarryForwardDays?: IntFilter<"leave_types"> | number
    isActive?: BoolFilter<"leave_types"> | boolean
    applicableGender?: StringNullableFilter<"leave_types"> | string | null
    isHalfDayAllowed?: BoolFilter<"leave_types"> | boolean
    isPaidLeave?: BoolFilter<"leave_types"> | boolean
    createdAt?: DateTimeFilter<"leave_types"> | Date | string
    updatedAt?: DateTimeFilter<"leave_types"> | Date | string
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests?: Leave_requestsListRelationFilter
  }, "id" | "name">

  export type leave_typesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    defaultDays?: SortOrder
    isCarryForward?: SortOrder
    maxCarryForwardDays?: SortOrder
    isActive?: SortOrder
    applicableGender?: SortOrderInput | SortOrder
    isHalfDayAllowed?: SortOrder
    isPaidLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: leave_typesCountOrderByAggregateInput
    _avg?: leave_typesAvgOrderByAggregateInput
    _max?: leave_typesMaxOrderByAggregateInput
    _min?: leave_typesMinOrderByAggregateInput
    _sum?: leave_typesSumOrderByAggregateInput
  }

  export type leave_typesScalarWhereWithAggregatesInput = {
    AND?: leave_typesScalarWhereWithAggregatesInput | leave_typesScalarWhereWithAggregatesInput[]
    OR?: leave_typesScalarWhereWithAggregatesInput[]
    NOT?: leave_typesScalarWhereWithAggregatesInput | leave_typesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"leave_types"> | string
    name?: StringWithAggregatesFilter<"leave_types"> | string
    description?: StringWithAggregatesFilter<"leave_types"> | string
    defaultDays?: IntWithAggregatesFilter<"leave_types"> | number
    isCarryForward?: BoolWithAggregatesFilter<"leave_types"> | boolean
    maxCarryForwardDays?: IntWithAggregatesFilter<"leave_types"> | number
    isActive?: BoolWithAggregatesFilter<"leave_types"> | boolean
    applicableGender?: StringNullableWithAggregatesFilter<"leave_types"> | string | null
    isHalfDayAllowed?: BoolWithAggregatesFilter<"leave_types"> | boolean
    isPaidLeave?: BoolWithAggregatesFilter<"leave_types"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"leave_types"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"leave_types"> | Date | string
  }

  export type migrationsWhereInput = {
    AND?: migrationsWhereInput | migrationsWhereInput[]
    OR?: migrationsWhereInput[]
    NOT?: migrationsWhereInput | migrationsWhereInput[]
    id?: IntFilter<"migrations"> | number
    timestamp?: BigIntFilter<"migrations"> | bigint | number
    name?: StringFilter<"migrations"> | string
  }

  export type migrationsOrderByWithRelationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    name?: SortOrder
  }

  export type migrationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: migrationsWhereInput | migrationsWhereInput[]
    OR?: migrationsWhereInput[]
    NOT?: migrationsWhereInput | migrationsWhereInput[]
    timestamp?: BigIntFilter<"migrations"> | bigint | number
    name?: StringFilter<"migrations"> | string
  }, "id">

  export type migrationsOrderByWithAggregationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    name?: SortOrder
    _count?: migrationsCountOrderByAggregateInput
    _avg?: migrationsAvgOrderByAggregateInput
    _max?: migrationsMaxOrderByAggregateInput
    _min?: migrationsMinOrderByAggregateInput
    _sum?: migrationsSumOrderByAggregateInput
  }

  export type migrationsScalarWhereWithAggregatesInput = {
    AND?: migrationsScalarWhereWithAggregatesInput | migrationsScalarWhereWithAggregatesInput[]
    OR?: migrationsScalarWhereWithAggregatesInput[]
    NOT?: migrationsScalarWhereWithAggregatesInput | migrationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"migrations"> | number
    timestamp?: BigIntWithAggregatesFilter<"migrations"> | bigint | number
    name?: StringWithAggregatesFilter<"migrations"> | string
  }

  export type pagesWhereInput = {
    AND?: pagesWhereInput | pagesWhereInput[]
    OR?: pagesWhereInput[]
    NOT?: pagesWhereInput | pagesWhereInput[]
    id?: UuidFilter<"pages"> | string
    name?: StringFilter<"pages"> | string
    description?: StringNullableFilter<"pages"> | string | null
    slug?: StringFilter<"pages"> | string
    isActive?: BoolFilter<"pages"> | boolean
    isSystem?: BoolFilter<"pages"> | boolean
    configuration?: StringNullableFilter<"pages"> | string | null
    accessRoles?: StringNullableFilter<"pages"> | string | null
    createdAt?: DateTimeFilter<"pages"> | Date | string
    updatedAt?: DateTimeFilter<"pages"> | Date | string
  }

  export type pagesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    isSystem?: SortOrder
    configuration?: SortOrderInput | SortOrder
    accessRoles?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type pagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: pagesWhereInput | pagesWhereInput[]
    OR?: pagesWhereInput[]
    NOT?: pagesWhereInput | pagesWhereInput[]
    description?: StringNullableFilter<"pages"> | string | null
    isActive?: BoolFilter<"pages"> | boolean
    isSystem?: BoolFilter<"pages"> | boolean
    configuration?: StringNullableFilter<"pages"> | string | null
    accessRoles?: StringNullableFilter<"pages"> | string | null
    createdAt?: DateTimeFilter<"pages"> | Date | string
    updatedAt?: DateTimeFilter<"pages"> | Date | string
  }, "id" | "name" | "slug">

  export type pagesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    isSystem?: SortOrder
    configuration?: SortOrderInput | SortOrder
    accessRoles?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: pagesCountOrderByAggregateInput
    _max?: pagesMaxOrderByAggregateInput
    _min?: pagesMinOrderByAggregateInput
  }

  export type pagesScalarWhereWithAggregatesInput = {
    AND?: pagesScalarWhereWithAggregatesInput | pagesScalarWhereWithAggregatesInput[]
    OR?: pagesScalarWhereWithAggregatesInput[]
    NOT?: pagesScalarWhereWithAggregatesInput | pagesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"pages"> | string
    name?: StringWithAggregatesFilter<"pages"> | string
    description?: StringNullableWithAggregatesFilter<"pages"> | string | null
    slug?: StringWithAggregatesFilter<"pages"> | string
    isActive?: BoolWithAggregatesFilter<"pages"> | boolean
    isSystem?: BoolWithAggregatesFilter<"pages"> | boolean
    configuration?: StringNullableWithAggregatesFilter<"pages"> | string | null
    accessRoles?: StringNullableWithAggregatesFilter<"pages"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"pages"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"pages"> | Date | string
  }

  export type positionsWhereInput = {
    AND?: positionsWhereInput | positionsWhereInput[]
    OR?: positionsWhereInput[]
    NOT?: positionsWhereInput | positionsWhereInput[]
    id?: UuidFilter<"positions"> | string
    name?: StringFilter<"positions"> | string
    description?: StringNullableFilter<"positions"> | string | null
    isActive?: BoolFilter<"positions"> | boolean
    departmentId?: UuidNullableFilter<"positions"> | string | null
    level?: IntFilter<"positions"> | number
    createdAt?: DateTimeFilter<"positions"> | Date | string
    updatedAt?: DateTimeFilter<"positions"> | Date | string
    departments?: XOR<DepartmentsNullableScalarRelationFilter, departmentsWhereInput> | null
    users?: UsersListRelationFilter
  }

  export type positionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    departments?: departmentsOrderByWithRelationInput
    users?: usersOrderByRelationAggregateInput
  }

  export type positionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: positionsWhereInput | positionsWhereInput[]
    OR?: positionsWhereInput[]
    NOT?: positionsWhereInput | positionsWhereInput[]
    name?: StringFilter<"positions"> | string
    description?: StringNullableFilter<"positions"> | string | null
    isActive?: BoolFilter<"positions"> | boolean
    departmentId?: UuidNullableFilter<"positions"> | string | null
    level?: IntFilter<"positions"> | number
    createdAt?: DateTimeFilter<"positions"> | Date | string
    updatedAt?: DateTimeFilter<"positions"> | Date | string
    departments?: XOR<DepartmentsNullableScalarRelationFilter, departmentsWhereInput> | null
    users?: UsersListRelationFilter
  }, "id">

  export type positionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: positionsCountOrderByAggregateInput
    _avg?: positionsAvgOrderByAggregateInput
    _max?: positionsMaxOrderByAggregateInput
    _min?: positionsMinOrderByAggregateInput
    _sum?: positionsSumOrderByAggregateInput
  }

  export type positionsScalarWhereWithAggregatesInput = {
    AND?: positionsScalarWhereWithAggregatesInput | positionsScalarWhereWithAggregatesInput[]
    OR?: positionsScalarWhereWithAggregatesInput[]
    NOT?: positionsScalarWhereWithAggregatesInput | positionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"positions"> | string
    name?: StringWithAggregatesFilter<"positions"> | string
    description?: StringNullableWithAggregatesFilter<"positions"> | string | null
    isActive?: BoolWithAggregatesFilter<"positions"> | boolean
    departmentId?: UuidNullableWithAggregatesFilter<"positions"> | string | null
    level?: IntWithAggregatesFilter<"positions"> | number
    createdAt?: DateTimeWithAggregatesFilter<"positions"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"positions"> | Date | string
  }

  export type rolesWhereInput = {
    AND?: rolesWhereInput | rolesWhereInput[]
    OR?: rolesWhereInput[]
    NOT?: rolesWhereInput | rolesWhereInput[]
    id?: UuidFilter<"roles"> | string
    name?: StringFilter<"roles"> | string
    description?: StringNullableFilter<"roles"> | string | null
    isActive?: BoolFilter<"roles"> | boolean
    permissions?: StringNullableFilter<"roles"> | string | null
    isSystem?: BoolFilter<"roles"> | boolean
    createdAt?: DateTimeFilter<"roles"> | Date | string
    updatedAt?: DateTimeFilter<"roles"> | Date | string
    users?: UsersListRelationFilter
  }

  export type rolesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    permissions?: SortOrderInput | SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: usersOrderByRelationAggregateInput
  }

  export type rolesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: rolesWhereInput | rolesWhereInput[]
    OR?: rolesWhereInput[]
    NOT?: rolesWhereInput | rolesWhereInput[]
    description?: StringNullableFilter<"roles"> | string | null
    isActive?: BoolFilter<"roles"> | boolean
    permissions?: StringNullableFilter<"roles"> | string | null
    isSystem?: BoolFilter<"roles"> | boolean
    createdAt?: DateTimeFilter<"roles"> | Date | string
    updatedAt?: DateTimeFilter<"roles"> | Date | string
    users?: UsersListRelationFilter
  }, "id" | "name">

  export type rolesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    permissions?: SortOrderInput | SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: rolesCountOrderByAggregateInput
    _max?: rolesMaxOrderByAggregateInput
    _min?: rolesMinOrderByAggregateInput
  }

  export type rolesScalarWhereWithAggregatesInput = {
    AND?: rolesScalarWhereWithAggregatesInput | rolesScalarWhereWithAggregatesInput[]
    OR?: rolesScalarWhereWithAggregatesInput[]
    NOT?: rolesScalarWhereWithAggregatesInput | rolesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"roles"> | string
    name?: StringWithAggregatesFilter<"roles"> | string
    description?: StringNullableWithAggregatesFilter<"roles"> | string | null
    isActive?: BoolWithAggregatesFilter<"roles"> | boolean
    permissions?: StringNullableWithAggregatesFilter<"roles"> | string | null
    isSystem?: BoolWithAggregatesFilter<"roles"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"roles"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"roles"> | Date | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    firstName?: StringFilter<"users"> | string
    lastName?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    phoneNumber?: StringNullableFilter<"users"> | string | null
    address?: StringNullableFilter<"users"> | string | null
    role?: Enumuser_role_enumFilter<"users"> | $Enums.user_role_enum
    level?: Enumuser_level_enumFilter<"users"> | $Enums.user_level_enum
    gender?: Enumgender_enumNullableFilter<"users"> | $Enums.gender_enum | null
    managerId?: UuidNullableFilter<"users"> | string | null
    department?: StringNullableFilter<"users"> | string | null
    position?: StringNullableFilter<"users"> | string | null
    roleId?: UuidNullableFilter<"users"> | string | null
    departmentId?: UuidNullableFilter<"users"> | string | null
    positionId?: UuidNullableFilter<"users"> | string | null
    isActive?: BoolFilter<"users"> | boolean
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    hrId?: UuidNullableFilter<"users"> | string | null
    teamLeadId?: UuidNullableFilter<"users"> | string | null
    departments_departments_managerIdTousers?: DepartmentsListRelationFilter
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests_leave_requests_approverIdTousers?: Leave_requestsListRelationFilter
    leave_requests_leave_requests_userIdTousers?: Leave_requestsListRelationFilter
    departments_users_departmentIdTodepartments?: XOR<DepartmentsNullableScalarRelationFilter, departmentsWhereInput> | null
    users_users_hrIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users_users_hrIdTousers?: UsersListRelationFilter
    users_users_managerIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users_users_managerIdTousers?: UsersListRelationFilter
    positions?: XOR<PositionsNullableScalarRelationFilter, positionsWhereInput> | null
    roles?: XOR<RolesNullableScalarRelationFilter, rolesWhereInput> | null
    users_users_teamLeadIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users_users_teamLeadIdTousers?: UsersListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    role?: SortOrder
    level?: SortOrder
    gender?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    positionId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hrId?: SortOrderInput | SortOrder
    teamLeadId?: SortOrderInput | SortOrder
    departments_departments_managerIdTousers?: departmentsOrderByRelationAggregateInput
    leave_balances?: leave_balancesOrderByRelationAggregateInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsOrderByRelationAggregateInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsOrderByRelationAggregateInput
    departments_users_departmentIdTodepartments?: departmentsOrderByWithRelationInput
    users_users_hrIdTousers?: usersOrderByWithRelationInput
    other_users_users_hrIdTousers?: usersOrderByRelationAggregateInput
    users_users_managerIdTousers?: usersOrderByWithRelationInput
    other_users_users_managerIdTousers?: usersOrderByRelationAggregateInput
    positions?: positionsOrderByWithRelationInput
    roles?: rolesOrderByWithRelationInput
    users_users_teamLeadIdTousers?: usersOrderByWithRelationInput
    other_users_users_teamLeadIdTousers?: usersOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    firstName?: StringFilter<"users"> | string
    lastName?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    phoneNumber?: StringNullableFilter<"users"> | string | null
    address?: StringNullableFilter<"users"> | string | null
    role?: Enumuser_role_enumFilter<"users"> | $Enums.user_role_enum
    level?: Enumuser_level_enumFilter<"users"> | $Enums.user_level_enum
    gender?: Enumgender_enumNullableFilter<"users"> | $Enums.gender_enum | null
    managerId?: UuidNullableFilter<"users"> | string | null
    department?: StringNullableFilter<"users"> | string | null
    position?: StringNullableFilter<"users"> | string | null
    roleId?: UuidNullableFilter<"users"> | string | null
    departmentId?: UuidNullableFilter<"users"> | string | null
    positionId?: UuidNullableFilter<"users"> | string | null
    isActive?: BoolFilter<"users"> | boolean
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    hrId?: UuidNullableFilter<"users"> | string | null
    teamLeadId?: UuidNullableFilter<"users"> | string | null
    departments_departments_managerIdTousers?: DepartmentsListRelationFilter
    leave_balances?: Leave_balancesListRelationFilter
    leave_requests_leave_requests_approverIdTousers?: Leave_requestsListRelationFilter
    leave_requests_leave_requests_userIdTousers?: Leave_requestsListRelationFilter
    departments_users_departmentIdTodepartments?: XOR<DepartmentsNullableScalarRelationFilter, departmentsWhereInput> | null
    users_users_hrIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users_users_hrIdTousers?: UsersListRelationFilter
    users_users_managerIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users_users_managerIdTousers?: UsersListRelationFilter
    positions?: XOR<PositionsNullableScalarRelationFilter, positionsWhereInput> | null
    roles?: XOR<RolesNullableScalarRelationFilter, rolesWhereInput> | null
    users_users_teamLeadIdTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users_users_teamLeadIdTousers?: UsersListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    role?: SortOrder
    level?: SortOrder
    gender?: SortOrderInput | SortOrder
    managerId?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    positionId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hrId?: SortOrderInput | SortOrder
    teamLeadId?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    firstName?: StringWithAggregatesFilter<"users"> | string
    lastName?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"users"> | string | null
    address?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: Enumuser_role_enumWithAggregatesFilter<"users"> | $Enums.user_role_enum
    level?: Enumuser_level_enumWithAggregatesFilter<"users"> | $Enums.user_level_enum
    gender?: Enumgender_enumNullableWithAggregatesFilter<"users"> | $Enums.gender_enum | null
    managerId?: UuidNullableWithAggregatesFilter<"users"> | string | null
    department?: StringNullableWithAggregatesFilter<"users"> | string | null
    position?: StringNullableWithAggregatesFilter<"users"> | string | null
    roleId?: UuidNullableWithAggregatesFilter<"users"> | string | null
    departmentId?: UuidNullableWithAggregatesFilter<"users"> | string | null
    positionId?: UuidNullableWithAggregatesFilter<"users"> | string | null
    isActive?: BoolWithAggregatesFilter<"users"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"users"> | Date | string
    hrId?: UuidNullableWithAggregatesFilter<"users"> | string | null
    teamLeadId?: UuidNullableWithAggregatesFilter<"users"> | string | null
  }

  export type approval_workflowsCreateInput = {
    id?: string
    name: string
    minDays: number
    maxDays: number
    approvalLevels: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type approval_workflowsUncheckedCreateInput = {
    id?: string
    name: string
    minDays: number
    maxDays: number
    approvalLevels: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type approval_workflowsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    minDays?: FloatFieldUpdateOperationsInput | number
    maxDays?: FloatFieldUpdateOperationsInput | number
    approvalLevels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type approval_workflowsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    minDays?: FloatFieldUpdateOperationsInput | number
    maxDays?: FloatFieldUpdateOperationsInput | number
    approvalLevels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type approval_workflowsCreateManyInput = {
    id?: string
    name: string
    minDays: number
    maxDays: number
    approvalLevels: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type approval_workflowsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    minDays?: FloatFieldUpdateOperationsInput | number
    maxDays?: FloatFieldUpdateOperationsInput | number
    approvalLevels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type approval_workflowsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    minDays?: FloatFieldUpdateOperationsInput | number
    maxDays?: FloatFieldUpdateOperationsInput | number
    approvalLevels?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type departmentsCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users_departments_managerIdTousers?: usersCreateNestedOneWithoutDepartments_departments_managerIdTousersInput
    positions?: positionsCreateNestedManyWithoutDepartmentsInput
    users_users_departmentIdTodepartments?: usersCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput
  }

  export type departmentsUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    managerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: positionsUncheckedCreateNestedManyWithoutDepartmentsInput
    users_users_departmentIdTodepartments?: usersUncheckedCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput
  }

  export type departmentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users_departments_managerIdTousers?: usersUpdateOneWithoutDepartments_departments_managerIdTousersNestedInput
    positions?: positionsUpdateManyWithoutDepartmentsNestedInput
    users_users_departmentIdTodepartments?: usersUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput
  }

  export type departmentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: positionsUncheckedUpdateManyWithoutDepartmentsNestedInput
    users_users_departmentIdTodepartments?: usersUncheckedUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput
  }

  export type departmentsCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    managerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type departmentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type departmentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type holidaysCreateInput = {
    id?: string
    name: string
    date: Date | string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type holidaysUncheckedCreateInput = {
    id?: string
    name: string
    date: Date | string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type holidaysUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type holidaysUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type holidaysCreateManyInput = {
    id?: string
    name: string
    date: Date | string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type holidaysUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type holidaysUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_balancesCreateInput = {
    id?: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_types: leave_typesCreateNestedOneWithoutLeave_balancesInput
    users: usersCreateNestedOneWithoutLeave_balancesInput
  }

  export type leave_balancesUncheckedCreateInput = {
    id?: string
    userId: string
    leaveTypeId: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_balancesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_balancesNestedInput
    users?: usersUpdateOneRequiredWithoutLeave_balancesNestedInput
  }

  export type leave_balancesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_balancesCreateManyInput = {
    id?: string
    userId: string
    leaveTypeId: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_balancesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_balancesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_requestsCreateInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    users_leave_requests_approverIdTousers?: usersCreateNestedOneWithoutLeave_requests_leave_requests_approverIdTousersInput
    leave_types: leave_typesCreateNestedOneWithoutLeave_requestsInput
    users_leave_requests_userIdTousers: usersCreateNestedOneWithoutLeave_requests_leave_requests_userIdTousersInput
  }

  export type leave_requestsUncheckedCreateInput = {
    id?: string
    userId: string
    leaveTypeId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverId?: string | null
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    users_leave_requests_approverIdTousers?: usersUpdateOneWithoutLeave_requests_leave_requests_approverIdTousersNestedInput
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput
    users_leave_requests_userIdTousers?: usersUpdateOneRequiredWithoutLeave_requests_leave_requests_userIdTousersNestedInput
  }

  export type leave_requestsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsCreateManyInput = {
    id?: string
    userId: string
    leaveTypeId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverId?: string | null
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_typesCreateInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_balances?: leave_balancesCreateNestedManyWithoutLeave_typesInput
    leave_requests?: leave_requestsCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutLeave_typesInput
    leave_requests?: leave_requestsUncheckedCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_balances?: leave_balancesUpdateManyWithoutLeave_typesNestedInput
    leave_requests?: leave_requestsUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutLeave_typesNestedInput
    leave_requests?: leave_requestsUncheckedUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesCreateManyInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_typesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_typesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type migrationsCreateInput = {
    timestamp: bigint | number
    name: string
  }

  export type migrationsUncheckedCreateInput = {
    id?: number
    timestamp: bigint | number
    name: string
  }

  export type migrationsUpdateInput = {
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type migrationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type migrationsCreateManyInput = {
    id?: number
    timestamp: bigint | number
    name: string
  }

  export type migrationsUpdateManyMutationInput = {
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type migrationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type pagesCreateInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    isActive?: boolean
    isSystem?: boolean
    configuration?: string | null
    accessRoles?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type pagesUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    isActive?: boolean
    isSystem?: boolean
    configuration?: string | null
    accessRoles?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type pagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    accessRoles?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    accessRoles?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pagesCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    slug: string
    isActive?: boolean
    isSystem?: boolean
    configuration?: string | null
    accessRoles?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type pagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    accessRoles?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type pagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    configuration?: NullableStringFieldUpdateOperationsInput | string | null
    accessRoles?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type positionsCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    departments?: departmentsCreateNestedOneWithoutPositionsInput
    users?: usersCreateNestedManyWithoutPositionsInput
  }

  export type positionsUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    departmentId?: string | null
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: usersUncheckedCreateNestedManyWithoutPositionsInput
  }

  export type positionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments?: departmentsUpdateOneWithoutPositionsNestedInput
    users?: usersUpdateManyWithoutPositionsNestedInput
  }

  export type positionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUncheckedUpdateManyWithoutPositionsNestedInput
  }

  export type positionsCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    departmentId?: string | null
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type positionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type positionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type rolesCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    permissions?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: usersCreateNestedManyWithoutRolesInput
  }

  export type rolesUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    permissions?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: usersUncheckedCreateNestedManyWithoutRolesInput
  }

  export type rolesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permissions?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateManyWithoutRolesNestedInput
  }

  export type rolesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permissions?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type rolesCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    permissions?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type rolesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permissions?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type rolesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permissions?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type approval_workflowsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    approvalLevels?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type approval_workflowsAvgOrderByAggregateInput = {
    minDays?: SortOrder
    maxDays?: SortOrder
  }

  export type approval_workflowsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type approval_workflowsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    minDays?: SortOrder
    maxDays?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type approval_workflowsSumOrderByAggregateInput = {
    minDays?: SortOrder
    maxDays?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type PositionsListRelationFilter = {
    every?: positionsWhereInput
    some?: positionsWhereInput
    none?: positionsWhereInput
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type positionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type departmentsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    managerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type departmentsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    managerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type departmentsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    managerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type holidaysCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type holidaysMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type holidaysMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type Leave_typesScalarRelationFilter = {
    is?: leave_typesWhereInput
    isNot?: leave_typesWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type leave_balancesUserIdLeaveTypeIdYearCompoundUniqueInput = {
    userId: string
    leaveTypeId: string
    year: number
  }

  export type leave_balancesCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_balancesAvgOrderByAggregateInput = {
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
  }

  export type leave_balancesMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_balancesMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_balancesSumOrderByAggregateInput = {
    balance?: SortOrder
    used?: SortOrder
    carryForward?: SortOrder
    year?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type Enumleave_request_type_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_type_enum | Enumleave_request_type_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_type_enumFilter<$PrismaModel> | $Enums.leave_request_type_enum
  }

  export type Enumleave_request_status_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_status_enum | Enumleave_request_status_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_status_enumFilter<$PrismaModel> | $Enums.leave_request_status_enum
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type leave_requestsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requestType?: SortOrder
    numberOfDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    approverId?: SortOrder
    approverComments?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    metadata?: SortOrder
  }

  export type leave_requestsAvgOrderByAggregateInput = {
    numberOfDays?: SortOrder
  }

  export type leave_requestsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requestType?: SortOrder
    numberOfDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    approverId?: SortOrder
    approverComments?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_requestsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leaveTypeId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    requestType?: SortOrder
    numberOfDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    approverId?: SortOrder
    approverComments?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_requestsSumOrderByAggregateInput = {
    numberOfDays?: SortOrder
  }

  export type Enumleave_request_type_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_type_enum | Enumleave_request_type_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_type_enumWithAggregatesFilter<$PrismaModel> | $Enums.leave_request_type_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumleave_request_type_enumFilter<$PrismaModel>
    _max?: NestedEnumleave_request_type_enumFilter<$PrismaModel>
  }

  export type Enumleave_request_status_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_status_enum | Enumleave_request_status_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_status_enumWithAggregatesFilter<$PrismaModel> | $Enums.leave_request_status_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumleave_request_status_enumFilter<$PrismaModel>
    _max?: NestedEnumleave_request_status_enumFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type Leave_balancesListRelationFilter = {
    every?: leave_balancesWhereInput
    some?: leave_balancesWhereInput
    none?: leave_balancesWhereInput
  }

  export type Leave_requestsListRelationFilter = {
    every?: leave_requestsWhereInput
    some?: leave_requestsWhereInput
    none?: leave_requestsWhereInput
  }

  export type leave_balancesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type leave_requestsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type leave_typesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    defaultDays?: SortOrder
    isCarryForward?: SortOrder
    maxCarryForwardDays?: SortOrder
    isActive?: SortOrder
    applicableGender?: SortOrder
    isHalfDayAllowed?: SortOrder
    isPaidLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_typesAvgOrderByAggregateInput = {
    defaultDays?: SortOrder
    maxCarryForwardDays?: SortOrder
  }

  export type leave_typesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    defaultDays?: SortOrder
    isCarryForward?: SortOrder
    maxCarryForwardDays?: SortOrder
    isActive?: SortOrder
    applicableGender?: SortOrder
    isHalfDayAllowed?: SortOrder
    isPaidLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_typesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    defaultDays?: SortOrder
    isCarryForward?: SortOrder
    maxCarryForwardDays?: SortOrder
    isActive?: SortOrder
    applicableGender?: SortOrder
    isHalfDayAllowed?: SortOrder
    isPaidLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type leave_typesSumOrderByAggregateInput = {
    defaultDays?: SortOrder
    maxCarryForwardDays?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type migrationsCountOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    name?: SortOrder
  }

  export type migrationsAvgOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type migrationsMaxOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    name?: SortOrder
  }

  export type migrationsMinOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    name?: SortOrder
  }

  export type migrationsSumOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type pagesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    isSystem?: SortOrder
    configuration?: SortOrder
    accessRoles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type pagesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    isSystem?: SortOrder
    configuration?: SortOrder
    accessRoles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type pagesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    slug?: SortOrder
    isActive?: SortOrder
    isSystem?: SortOrder
    configuration?: SortOrder
    accessRoles?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentsNullableScalarRelationFilter = {
    is?: departmentsWhereInput | null
    isNot?: departmentsWhereInput | null
  }

  export type positionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    departmentId?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type positionsAvgOrderByAggregateInput = {
    level?: SortOrder
  }

  export type positionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    departmentId?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type positionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    departmentId?: SortOrder
    level?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type positionsSumOrderByAggregateInput = {
    level?: SortOrder
  }

  export type rolesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    permissions?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type rolesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    permissions?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type rolesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    permissions?: SortOrder
    isSystem?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type Enumuser_role_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role_enum | Enumuser_role_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_role_enumFilter<$PrismaModel> | $Enums.user_role_enum
  }

  export type Enumuser_level_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.user_level_enum | Enumuser_level_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_level_enumFilter<$PrismaModel> | $Enums.user_level_enum
  }

  export type Enumgender_enumNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.gender_enum | Enumgender_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumgender_enumNullableFilter<$PrismaModel> | $Enums.gender_enum | null
  }

  export type DepartmentsListRelationFilter = {
    every?: departmentsWhereInput
    some?: departmentsWhereInput
    none?: departmentsWhereInput
  }

  export type PositionsNullableScalarRelationFilter = {
    is?: positionsWhereInput | null
    isNot?: positionsWhereInput | null
  }

  export type RolesNullableScalarRelationFilter = {
    is?: rolesWhereInput | null
    isNot?: rolesWhereInput | null
  }

  export type departmentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    role?: SortOrder
    level?: SortOrder
    gender?: SortOrder
    managerId?: SortOrder
    department?: SortOrder
    position?: SortOrder
    roleId?: SortOrder
    departmentId?: SortOrder
    positionId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hrId?: SortOrder
    teamLeadId?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    role?: SortOrder
    level?: SortOrder
    gender?: SortOrder
    managerId?: SortOrder
    department?: SortOrder
    position?: SortOrder
    roleId?: SortOrder
    departmentId?: SortOrder
    positionId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hrId?: SortOrder
    teamLeadId?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    role?: SortOrder
    level?: SortOrder
    gender?: SortOrder
    managerId?: SortOrder
    department?: SortOrder
    position?: SortOrder
    roleId?: SortOrder
    departmentId?: SortOrder
    positionId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hrId?: SortOrder
    teamLeadId?: SortOrder
  }

  export type Enumuser_role_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role_enum | Enumuser_role_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_role_enumWithAggregatesFilter<$PrismaModel> | $Enums.user_role_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuser_role_enumFilter<$PrismaModel>
    _max?: NestedEnumuser_role_enumFilter<$PrismaModel>
  }

  export type Enumuser_level_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_level_enum | Enumuser_level_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_level_enumWithAggregatesFilter<$PrismaModel> | $Enums.user_level_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuser_level_enumFilter<$PrismaModel>
    _max?: NestedEnumuser_level_enumFilter<$PrismaModel>
  }

  export type Enumgender_enumNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.gender_enum | Enumgender_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumgender_enumNullableWithAggregatesFilter<$PrismaModel> | $Enums.gender_enum | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumgender_enumNullableFilter<$PrismaModel>
    _max?: NestedEnumgender_enumNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersCreateNestedOneWithoutDepartments_departments_managerIdTousersInput = {
    create?: XOR<usersCreateWithoutDepartments_departments_managerIdTousersInput, usersUncheckedCreateWithoutDepartments_departments_managerIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDepartments_departments_managerIdTousersInput
    connect?: usersWhereUniqueInput
  }

  export type positionsCreateNestedManyWithoutDepartmentsInput = {
    create?: XOR<positionsCreateWithoutDepartmentsInput, positionsUncheckedCreateWithoutDepartmentsInput> | positionsCreateWithoutDepartmentsInput[] | positionsUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: positionsCreateOrConnectWithoutDepartmentsInput | positionsCreateOrConnectWithoutDepartmentsInput[]
    createMany?: positionsCreateManyDepartmentsInputEnvelope
    connect?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
  }

  export type usersCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput = {
    create?: XOR<usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput> | usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput[] | usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput | usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput[]
    createMany?: usersCreateManyDepartments_users_departmentIdTodepartmentsInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type positionsUncheckedCreateNestedManyWithoutDepartmentsInput = {
    create?: XOR<positionsCreateWithoutDepartmentsInput, positionsUncheckedCreateWithoutDepartmentsInput> | positionsCreateWithoutDepartmentsInput[] | positionsUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: positionsCreateOrConnectWithoutDepartmentsInput | positionsCreateOrConnectWithoutDepartmentsInput[]
    createMany?: positionsCreateManyDepartmentsInputEnvelope
    connect?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput = {
    create?: XOR<usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput> | usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput[] | usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput | usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput[]
    createMany?: usersCreateManyDepartments_users_departmentIdTodepartmentsInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type usersUpdateOneWithoutDepartments_departments_managerIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutDepartments_departments_managerIdTousersInput, usersUncheckedCreateWithoutDepartments_departments_managerIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDepartments_departments_managerIdTousersInput
    upsert?: usersUpsertWithoutDepartments_departments_managerIdTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDepartments_departments_managerIdTousersInput, usersUpdateWithoutDepartments_departments_managerIdTousersInput>, usersUncheckedUpdateWithoutDepartments_departments_managerIdTousersInput>
  }

  export type positionsUpdateManyWithoutDepartmentsNestedInput = {
    create?: XOR<positionsCreateWithoutDepartmentsInput, positionsUncheckedCreateWithoutDepartmentsInput> | positionsCreateWithoutDepartmentsInput[] | positionsUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: positionsCreateOrConnectWithoutDepartmentsInput | positionsCreateOrConnectWithoutDepartmentsInput[]
    upsert?: positionsUpsertWithWhereUniqueWithoutDepartmentsInput | positionsUpsertWithWhereUniqueWithoutDepartmentsInput[]
    createMany?: positionsCreateManyDepartmentsInputEnvelope
    set?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    disconnect?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    delete?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    connect?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    update?: positionsUpdateWithWhereUniqueWithoutDepartmentsInput | positionsUpdateWithWhereUniqueWithoutDepartmentsInput[]
    updateMany?: positionsUpdateManyWithWhereWithoutDepartmentsInput | positionsUpdateManyWithWhereWithoutDepartmentsInput[]
    deleteMany?: positionsScalarWhereInput | positionsScalarWhereInput[]
  }

  export type usersUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput = {
    create?: XOR<usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput> | usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput[] | usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput | usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput | usersUpsertWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput[]
    createMany?: usersCreateManyDepartments_users_departmentIdTodepartmentsInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput | usersUpdateWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput[]
    updateMany?: usersUpdateManyWithWhereWithoutDepartments_users_departmentIdTodepartmentsInput | usersUpdateManyWithWhereWithoutDepartments_users_departmentIdTodepartmentsInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type positionsUncheckedUpdateManyWithoutDepartmentsNestedInput = {
    create?: XOR<positionsCreateWithoutDepartmentsInput, positionsUncheckedCreateWithoutDepartmentsInput> | positionsCreateWithoutDepartmentsInput[] | positionsUncheckedCreateWithoutDepartmentsInput[]
    connectOrCreate?: positionsCreateOrConnectWithoutDepartmentsInput | positionsCreateOrConnectWithoutDepartmentsInput[]
    upsert?: positionsUpsertWithWhereUniqueWithoutDepartmentsInput | positionsUpsertWithWhereUniqueWithoutDepartmentsInput[]
    createMany?: positionsCreateManyDepartmentsInputEnvelope
    set?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    disconnect?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    delete?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    connect?: positionsWhereUniqueInput | positionsWhereUniqueInput[]
    update?: positionsUpdateWithWhereUniqueWithoutDepartmentsInput | positionsUpdateWithWhereUniqueWithoutDepartmentsInput[]
    updateMany?: positionsUpdateManyWithWhereWithoutDepartmentsInput | positionsUpdateManyWithWhereWithoutDepartmentsInput[]
    deleteMany?: positionsScalarWhereInput | positionsScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput = {
    create?: XOR<usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput> | usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput[] | usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput | usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput | usersUpsertWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput[]
    createMany?: usersCreateManyDepartments_users_departmentIdTodepartmentsInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput | usersUpdateWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput[]
    updateMany?: usersUpdateManyWithWhereWithoutDepartments_users_departmentIdTodepartmentsInput | usersUpdateManyWithWhereWithoutDepartments_users_departmentIdTodepartmentsInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type leave_typesCreateNestedOneWithoutLeave_balancesInput = {
    create?: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_balancesInput
    connect?: leave_typesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutLeave_balancesInput = {
    create?: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_balancesInput
    connect?: usersWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type leave_typesUpdateOneRequiredWithoutLeave_balancesNestedInput = {
    create?: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_balancesInput
    upsert?: leave_typesUpsertWithoutLeave_balancesInput
    connect?: leave_typesWhereUniqueInput
    update?: XOR<XOR<leave_typesUpdateToOneWithWhereWithoutLeave_balancesInput, leave_typesUpdateWithoutLeave_balancesInput>, leave_typesUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type usersUpdateOneRequiredWithoutLeave_balancesNestedInput = {
    create?: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_balancesInput
    upsert?: usersUpsertWithoutLeave_balancesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLeave_balancesInput, usersUpdateWithoutLeave_balancesInput>, usersUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type usersCreateNestedOneWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    create?: XOR<usersCreateWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_approverIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_requests_leave_requests_approverIdTousersInput
    connect?: usersWhereUniqueInput
  }

  export type leave_typesCreateNestedOneWithoutLeave_requestsInput = {
    create?: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_requestsInput
    connect?: leave_typesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutLeave_requests_leave_requests_userIdTousersInput = {
    create?: XOR<usersCreateWithoutLeave_requests_leave_requests_userIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_userIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_requests_leave_requests_userIdTousersInput
    connect?: usersWhereUniqueInput
  }

  export type Enumleave_request_type_enumFieldUpdateOperationsInput = {
    set?: $Enums.leave_request_type_enum
  }

  export type Enumleave_request_status_enumFieldUpdateOperationsInput = {
    set?: $Enums.leave_request_status_enum
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneWithoutLeave_requests_leave_requests_approverIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_approverIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_requests_leave_requests_approverIdTousersInput
    upsert?: usersUpsertWithoutLeave_requests_leave_requests_approverIdTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput>, usersUncheckedUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput>
  }

  export type leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput = {
    create?: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
    connectOrCreate?: leave_typesCreateOrConnectWithoutLeave_requestsInput
    upsert?: leave_typesUpsertWithoutLeave_requestsInput
    connect?: leave_typesWhereUniqueInput
    update?: XOR<XOR<leave_typesUpdateToOneWithWhereWithoutLeave_requestsInput, leave_typesUpdateWithoutLeave_requestsInput>, leave_typesUncheckedUpdateWithoutLeave_requestsInput>
  }

  export type usersUpdateOneRequiredWithoutLeave_requests_leave_requests_userIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutLeave_requests_leave_requests_userIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_userIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutLeave_requests_leave_requests_userIdTousersInput
    upsert?: usersUpsertWithoutLeave_requests_leave_requests_userIdTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLeave_requests_leave_requests_userIdTousersInput, usersUpdateWithoutLeave_requests_leave_requests_userIdTousersInput>, usersUncheckedUpdateWithoutLeave_requests_leave_requests_userIdTousersInput>
  }

  export type leave_balancesCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type leave_balancesUncheckedCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsUncheckedCreateNestedManyWithoutLeave_typesInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type leave_balancesUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutLeave_typesInput | leave_balancesUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutLeave_typesInput | leave_requestsUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type leave_balancesUncheckedUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput> | leave_balancesCreateWithoutLeave_typesInput[] | leave_balancesUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutLeave_typesInput | leave_balancesCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_balancesCreateManyLeave_typesInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput | leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutLeave_typesInput | leave_balancesUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUncheckedUpdateManyWithoutLeave_typesNestedInput = {
    create?: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput> | leave_requestsCreateWithoutLeave_typesInput[] | leave_requestsUncheckedCreateWithoutLeave_typesInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutLeave_typesInput | leave_requestsCreateOrConnectWithoutLeave_typesInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput[]
    createMany?: leave_requestsCreateManyLeave_typesInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput | leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutLeave_typesInput | leave_requestsUpdateManyWithWhereWithoutLeave_typesInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type departmentsCreateNestedOneWithoutPositionsInput = {
    create?: XOR<departmentsCreateWithoutPositionsInput, departmentsUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: departmentsCreateOrConnectWithoutPositionsInput
    connect?: departmentsWhereUniqueInput
  }

  export type usersCreateNestedManyWithoutPositionsInput = {
    create?: XOR<usersCreateWithoutPositionsInput, usersUncheckedCreateWithoutPositionsInput> | usersCreateWithoutPositionsInput[] | usersUncheckedCreateWithoutPositionsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutPositionsInput | usersCreateOrConnectWithoutPositionsInput[]
    createMany?: usersCreateManyPositionsInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutPositionsInput = {
    create?: XOR<usersCreateWithoutPositionsInput, usersUncheckedCreateWithoutPositionsInput> | usersCreateWithoutPositionsInput[] | usersUncheckedCreateWithoutPositionsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutPositionsInput | usersCreateOrConnectWithoutPositionsInput[]
    createMany?: usersCreateManyPositionsInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type departmentsUpdateOneWithoutPositionsNestedInput = {
    create?: XOR<departmentsCreateWithoutPositionsInput, departmentsUncheckedCreateWithoutPositionsInput>
    connectOrCreate?: departmentsCreateOrConnectWithoutPositionsInput
    upsert?: departmentsUpsertWithoutPositionsInput
    disconnect?: departmentsWhereInput | boolean
    delete?: departmentsWhereInput | boolean
    connect?: departmentsWhereUniqueInput
    update?: XOR<XOR<departmentsUpdateToOneWithWhereWithoutPositionsInput, departmentsUpdateWithoutPositionsInput>, departmentsUncheckedUpdateWithoutPositionsInput>
  }

  export type usersUpdateManyWithoutPositionsNestedInput = {
    create?: XOR<usersCreateWithoutPositionsInput, usersUncheckedCreateWithoutPositionsInput> | usersCreateWithoutPositionsInput[] | usersUncheckedCreateWithoutPositionsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutPositionsInput | usersCreateOrConnectWithoutPositionsInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutPositionsInput | usersUpsertWithWhereUniqueWithoutPositionsInput[]
    createMany?: usersCreateManyPositionsInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutPositionsInput | usersUpdateWithWhereUniqueWithoutPositionsInput[]
    updateMany?: usersUpdateManyWithWhereWithoutPositionsInput | usersUpdateManyWithWhereWithoutPositionsInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutPositionsNestedInput = {
    create?: XOR<usersCreateWithoutPositionsInput, usersUncheckedCreateWithoutPositionsInput> | usersCreateWithoutPositionsInput[] | usersUncheckedCreateWithoutPositionsInput[]
    connectOrCreate?: usersCreateOrConnectWithoutPositionsInput | usersCreateOrConnectWithoutPositionsInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutPositionsInput | usersUpsertWithWhereUniqueWithoutPositionsInput[]
    createMany?: usersCreateManyPositionsInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutPositionsInput | usersUpdateWithWhereUniqueWithoutPositionsInput[]
    updateMany?: usersUpdateManyWithWhereWithoutPositionsInput | usersUpdateManyWithWhereWithoutPositionsInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersCreateNestedManyWithoutRolesInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUpdateManyWithoutRolesNestedInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutRolesInput | usersUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutRolesInput | usersUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutRolesInput | usersUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutRolesInput | usersUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutRolesInput | usersUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutRolesInput | usersUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput = {
    create?: XOR<departmentsCreateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput> | departmentsCreateWithoutUsers_departments_managerIdTousersInput[] | departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput[]
    connectOrCreate?: departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput | departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput[]
    createMany?: departmentsCreateManyUsers_departments_managerIdTousersInputEnvelope
    connect?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
  }

  export type leave_balancesCreateNestedManyWithoutUsersInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_approverIdTousersInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_userIdTousersInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput = {
    create?: XOR<departmentsCreateWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUncheckedCreateWithoutUsers_users_departmentIdTodepartmentsInput>
    connectOrCreate?: departmentsCreateOrConnectWithoutUsers_users_departmentIdTodepartmentsInput
    connect?: departmentsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput = {
    create?: XOR<usersCreateWithoutOther_users_users_hrIdTousersInput, usersUncheckedCreateWithoutOther_users_users_hrIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_users_users_hrIdTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedManyWithoutUsers_users_hrIdTousersInput = {
    create?: XOR<usersCreateWithoutUsers_users_hrIdTousersInput, usersUncheckedCreateWithoutUsers_users_hrIdTousersInput> | usersCreateWithoutUsers_users_hrIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_hrIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_hrIdTousersInput | usersCreateOrConnectWithoutUsers_users_hrIdTousersInput[]
    createMany?: usersCreateManyUsers_users_hrIdTousersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput = {
    create?: XOR<usersCreateWithoutOther_users_users_managerIdTousersInput, usersUncheckedCreateWithoutOther_users_users_managerIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_users_users_managerIdTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedManyWithoutUsers_users_managerIdTousersInput = {
    create?: XOR<usersCreateWithoutUsers_users_managerIdTousersInput, usersUncheckedCreateWithoutUsers_users_managerIdTousersInput> | usersCreateWithoutUsers_users_managerIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_managerIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_managerIdTousersInput | usersCreateOrConnectWithoutUsers_users_managerIdTousersInput[]
    createMany?: usersCreateManyUsers_users_managerIdTousersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type positionsCreateNestedOneWithoutUsersInput = {
    create?: XOR<positionsCreateWithoutUsersInput, positionsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: positionsCreateOrConnectWithoutUsersInput
    connect?: positionsWhereUniqueInput
  }

  export type rolesCreateNestedOneWithoutUsersInput = {
    create?: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: rolesCreateOrConnectWithoutUsersInput
    connect?: rolesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput = {
    create?: XOR<usersCreateWithoutOther_users_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutOther_users_users_teamLeadIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_users_users_teamLeadIdTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput = {
    create?: XOR<usersCreateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput> | usersCreateWithoutUsers_users_teamLeadIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput | usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput[]
    createMany?: usersCreateManyUsers_users_teamLeadIdTousersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput = {
    create?: XOR<departmentsCreateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput> | departmentsCreateWithoutUsers_departments_managerIdTousersInput[] | departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput[]
    connectOrCreate?: departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput | departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput[]
    createMany?: departmentsCreateManyUsers_departments_managerIdTousersInputEnvelope
    connect?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
  }

  export type leave_balancesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
  }

  export type leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_approverIdTousersInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_userIdTousersInputEnvelope
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput = {
    create?: XOR<usersCreateWithoutUsers_users_hrIdTousersInput, usersUncheckedCreateWithoutUsers_users_hrIdTousersInput> | usersCreateWithoutUsers_users_hrIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_hrIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_hrIdTousersInput | usersCreateOrConnectWithoutUsers_users_hrIdTousersInput[]
    createMany?: usersCreateManyUsers_users_hrIdTousersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput = {
    create?: XOR<usersCreateWithoutUsers_users_managerIdTousersInput, usersUncheckedCreateWithoutUsers_users_managerIdTousersInput> | usersCreateWithoutUsers_users_managerIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_managerIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_managerIdTousersInput | usersCreateOrConnectWithoutUsers_users_managerIdTousersInput[]
    createMany?: usersCreateManyUsers_users_managerIdTousersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput = {
    create?: XOR<usersCreateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput> | usersCreateWithoutUsers_users_teamLeadIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput | usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput[]
    createMany?: usersCreateManyUsers_users_teamLeadIdTousersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type Enumuser_role_enumFieldUpdateOperationsInput = {
    set?: $Enums.user_role_enum
  }

  export type Enumuser_level_enumFieldUpdateOperationsInput = {
    set?: $Enums.user_level_enum
  }

  export type NullableEnumgender_enumFieldUpdateOperationsInput = {
    set?: $Enums.gender_enum | null
  }

  export type departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput = {
    create?: XOR<departmentsCreateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput> | departmentsCreateWithoutUsers_departments_managerIdTousersInput[] | departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput[]
    connectOrCreate?: departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput | departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput[]
    upsert?: departmentsUpsertWithWhereUniqueWithoutUsers_departments_managerIdTousersInput | departmentsUpsertWithWhereUniqueWithoutUsers_departments_managerIdTousersInput[]
    createMany?: departmentsCreateManyUsers_departments_managerIdTousersInputEnvelope
    set?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    disconnect?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    delete?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    connect?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    update?: departmentsUpdateWithWhereUniqueWithoutUsers_departments_managerIdTousersInput | departmentsUpdateWithWhereUniqueWithoutUsers_departments_managerIdTousersInput[]
    updateMany?: departmentsUpdateManyWithWhereWithoutUsers_departments_managerIdTousersInput | departmentsUpdateManyWithWhereWithoutUsers_departments_managerIdTousersInput[]
    deleteMany?: departmentsScalarWhereInput | departmentsScalarWhereInput[]
  }

  export type leave_balancesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutUsersInput | leave_balancesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutUsersInput | leave_balancesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutUsersInput | leave_balancesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_approverIdTousersInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_approverIdTousersInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput | leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_userIdTousersInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput | leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_userIdTousersInput | leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_userIdTousersInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput = {
    create?: XOR<departmentsCreateWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUncheckedCreateWithoutUsers_users_departmentIdTodepartmentsInput>
    connectOrCreate?: departmentsCreateOrConnectWithoutUsers_users_departmentIdTodepartmentsInput
    upsert?: departmentsUpsertWithoutUsers_users_departmentIdTodepartmentsInput
    disconnect?: departmentsWhereInput | boolean
    delete?: departmentsWhereInput | boolean
    connect?: departmentsWhereUniqueInput
    update?: XOR<XOR<departmentsUpdateToOneWithWhereWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUpdateWithoutUsers_users_departmentIdTodepartmentsInput>, departmentsUncheckedUpdateWithoutUsers_users_departmentIdTodepartmentsInput>
  }

  export type usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutOther_users_users_hrIdTousersInput, usersUncheckedCreateWithoutOther_users_users_hrIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_users_users_hrIdTousersInput
    upsert?: usersUpsertWithoutOther_users_users_hrIdTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutOther_users_users_hrIdTousersInput, usersUpdateWithoutOther_users_users_hrIdTousersInput>, usersUncheckedUpdateWithoutOther_users_users_hrIdTousersInput>
  }

  export type usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutUsers_users_hrIdTousersInput, usersUncheckedCreateWithoutUsers_users_hrIdTousersInput> | usersCreateWithoutUsers_users_hrIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_hrIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_hrIdTousersInput | usersCreateOrConnectWithoutUsers_users_hrIdTousersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsers_users_hrIdTousersInput | usersUpsertWithWhereUniqueWithoutUsers_users_hrIdTousersInput[]
    createMany?: usersCreateManyUsers_users_hrIdTousersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsers_users_hrIdTousersInput | usersUpdateWithWhereUniqueWithoutUsers_users_hrIdTousersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsers_users_hrIdTousersInput | usersUpdateManyWithWhereWithoutUsers_users_hrIdTousersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutOther_users_users_managerIdTousersInput, usersUncheckedCreateWithoutOther_users_users_managerIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_users_users_managerIdTousersInput
    upsert?: usersUpsertWithoutOther_users_users_managerIdTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutOther_users_users_managerIdTousersInput, usersUpdateWithoutOther_users_users_managerIdTousersInput>, usersUncheckedUpdateWithoutOther_users_users_managerIdTousersInput>
  }

  export type usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutUsers_users_managerIdTousersInput, usersUncheckedCreateWithoutUsers_users_managerIdTousersInput> | usersCreateWithoutUsers_users_managerIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_managerIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_managerIdTousersInput | usersCreateOrConnectWithoutUsers_users_managerIdTousersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsers_users_managerIdTousersInput | usersUpsertWithWhereUniqueWithoutUsers_users_managerIdTousersInput[]
    createMany?: usersCreateManyUsers_users_managerIdTousersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsers_users_managerIdTousersInput | usersUpdateWithWhereUniqueWithoutUsers_users_managerIdTousersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsers_users_managerIdTousersInput | usersUpdateManyWithWhereWithoutUsers_users_managerIdTousersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type positionsUpdateOneWithoutUsersNestedInput = {
    create?: XOR<positionsCreateWithoutUsersInput, positionsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: positionsCreateOrConnectWithoutUsersInput
    upsert?: positionsUpsertWithoutUsersInput
    disconnect?: positionsWhereInput | boolean
    delete?: positionsWhereInput | boolean
    connect?: positionsWhereUniqueInput
    update?: XOR<XOR<positionsUpdateToOneWithWhereWithoutUsersInput, positionsUpdateWithoutUsersInput>, positionsUncheckedUpdateWithoutUsersInput>
  }

  export type rolesUpdateOneWithoutUsersNestedInput = {
    create?: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: rolesCreateOrConnectWithoutUsersInput
    upsert?: rolesUpsertWithoutUsersInput
    disconnect?: rolesWhereInput | boolean
    delete?: rolesWhereInput | boolean
    connect?: rolesWhereUniqueInput
    update?: XOR<XOR<rolesUpdateToOneWithWhereWithoutUsersInput, rolesUpdateWithoutUsersInput>, rolesUncheckedUpdateWithoutUsersInput>
  }

  export type usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutOther_users_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutOther_users_users_teamLeadIdTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_users_users_teamLeadIdTousersInput
    upsert?: usersUpsertWithoutOther_users_users_teamLeadIdTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutOther_users_users_teamLeadIdTousersInput, usersUpdateWithoutOther_users_users_teamLeadIdTousersInput>, usersUncheckedUpdateWithoutOther_users_users_teamLeadIdTousersInput>
  }

  export type usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput> | usersCreateWithoutUsers_users_teamLeadIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput | usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput | usersUpsertWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput[]
    createMany?: usersCreateManyUsers_users_teamLeadIdTousersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput | usersUpdateWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsers_users_teamLeadIdTousersInput | usersUpdateManyWithWhereWithoutUsers_users_teamLeadIdTousersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput = {
    create?: XOR<departmentsCreateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput> | departmentsCreateWithoutUsers_departments_managerIdTousersInput[] | departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput[]
    connectOrCreate?: departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput | departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput[]
    upsert?: departmentsUpsertWithWhereUniqueWithoutUsers_departments_managerIdTousersInput | departmentsUpsertWithWhereUniqueWithoutUsers_departments_managerIdTousersInput[]
    createMany?: departmentsCreateManyUsers_departments_managerIdTousersInputEnvelope
    set?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    disconnect?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    delete?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    connect?: departmentsWhereUniqueInput | departmentsWhereUniqueInput[]
    update?: departmentsUpdateWithWhereUniqueWithoutUsers_departments_managerIdTousersInput | departmentsUpdateWithWhereUniqueWithoutUsers_departments_managerIdTousersInput[]
    updateMany?: departmentsUpdateManyWithWhereWithoutUsers_departments_managerIdTousersInput | departmentsUpdateManyWithWhereWithoutUsers_departments_managerIdTousersInput[]
    deleteMany?: departmentsScalarWhereInput | departmentsScalarWhereInput[]
  }

  export type leave_balancesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput> | leave_balancesCreateWithoutUsersInput[] | leave_balancesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: leave_balancesCreateOrConnectWithoutUsersInput | leave_balancesCreateOrConnectWithoutUsersInput[]
    upsert?: leave_balancesUpsertWithWhereUniqueWithoutUsersInput | leave_balancesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: leave_balancesCreateManyUsersInputEnvelope
    set?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    disconnect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    delete?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    connect?: leave_balancesWhereUniqueInput | leave_balancesWhereUniqueInput[]
    update?: leave_balancesUpdateWithWhereUniqueWithoutUsersInput | leave_balancesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: leave_balancesUpdateManyWithWhereWithoutUsersInput | leave_balancesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
  }

  export type leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_approverIdTousersInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_approverIdTousersInput | leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_approverIdTousersInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput = {
    create?: XOR<leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput> | leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput[] | leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput[]
    connectOrCreate?: leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput | leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput[]
    upsert?: leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput | leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput[]
    createMany?: leave_requestsCreateManyUsers_leave_requests_userIdTousersInputEnvelope
    set?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    disconnect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    delete?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    connect?: leave_requestsWhereUniqueInput | leave_requestsWhereUniqueInput[]
    update?: leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput | leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput[]
    updateMany?: leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_userIdTousersInput | leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_userIdTousersInput[]
    deleteMany?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutUsers_users_hrIdTousersInput, usersUncheckedCreateWithoutUsers_users_hrIdTousersInput> | usersCreateWithoutUsers_users_hrIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_hrIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_hrIdTousersInput | usersCreateOrConnectWithoutUsers_users_hrIdTousersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsers_users_hrIdTousersInput | usersUpsertWithWhereUniqueWithoutUsers_users_hrIdTousersInput[]
    createMany?: usersCreateManyUsers_users_hrIdTousersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsers_users_hrIdTousersInput | usersUpdateWithWhereUniqueWithoutUsers_users_hrIdTousersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsers_users_hrIdTousersInput | usersUpdateManyWithWhereWithoutUsers_users_hrIdTousersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutUsers_users_managerIdTousersInput, usersUncheckedCreateWithoutUsers_users_managerIdTousersInput> | usersCreateWithoutUsers_users_managerIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_managerIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_managerIdTousersInput | usersCreateOrConnectWithoutUsers_users_managerIdTousersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsers_users_managerIdTousersInput | usersUpsertWithWhereUniqueWithoutUsers_users_managerIdTousersInput[]
    createMany?: usersCreateManyUsers_users_managerIdTousersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsers_users_managerIdTousersInput | usersUpdateWithWhereUniqueWithoutUsers_users_managerIdTousersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsers_users_managerIdTousersInput | usersUpdateManyWithWhereWithoutUsers_users_managerIdTousersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput = {
    create?: XOR<usersCreateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput> | usersCreateWithoutUsers_users_teamLeadIdTousersInput[] | usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput | usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput | usersUpsertWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput[]
    createMany?: usersCreateManyUsers_users_teamLeadIdTousersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput | usersUpdateWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsers_users_teamLeadIdTousersInput | usersUpdateManyWithWhereWithoutUsers_users_teamLeadIdTousersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumleave_request_type_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_type_enum | Enumleave_request_type_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_type_enumFilter<$PrismaModel> | $Enums.leave_request_type_enum
  }

  export type NestedEnumleave_request_status_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_status_enum | Enumleave_request_status_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_status_enumFilter<$PrismaModel> | $Enums.leave_request_status_enum
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumleave_request_type_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_type_enum | Enumleave_request_type_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_type_enum[] | ListEnumleave_request_type_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_type_enumWithAggregatesFilter<$PrismaModel> | $Enums.leave_request_type_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumleave_request_type_enumFilter<$PrismaModel>
    _max?: NestedEnumleave_request_type_enumFilter<$PrismaModel>
  }

  export type NestedEnumleave_request_status_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.leave_request_status_enum | Enumleave_request_status_enumFieldRefInput<$PrismaModel>
    in?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.leave_request_status_enum[] | ListEnumleave_request_status_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumleave_request_status_enumWithAggregatesFilter<$PrismaModel> | $Enums.leave_request_status_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumleave_request_status_enumFilter<$PrismaModel>
    _max?: NestedEnumleave_request_status_enumFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumuser_role_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role_enum | Enumuser_role_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_role_enumFilter<$PrismaModel> | $Enums.user_role_enum
  }

  export type NestedEnumuser_level_enumFilter<$PrismaModel = never> = {
    equals?: $Enums.user_level_enum | Enumuser_level_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_level_enumFilter<$PrismaModel> | $Enums.user_level_enum
  }

  export type NestedEnumgender_enumNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.gender_enum | Enumgender_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumgender_enumNullableFilter<$PrismaModel> | $Enums.gender_enum | null
  }

  export type NestedEnumuser_role_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role_enum | Enumuser_role_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role_enum[] | ListEnumuser_role_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_role_enumWithAggregatesFilter<$PrismaModel> | $Enums.user_role_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuser_role_enumFilter<$PrismaModel>
    _max?: NestedEnumuser_role_enumFilter<$PrismaModel>
  }

  export type NestedEnumuser_level_enumWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_level_enum | Enumuser_level_enumFieldRefInput<$PrismaModel>
    in?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_level_enum[] | ListEnumuser_level_enumFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_level_enumWithAggregatesFilter<$PrismaModel> | $Enums.user_level_enum
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuser_level_enumFilter<$PrismaModel>
    _max?: NestedEnumuser_level_enumFilter<$PrismaModel>
  }

  export type NestedEnumgender_enumNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.gender_enum | Enumgender_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.gender_enum[] | ListEnumgender_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumgender_enumNullableWithAggregatesFilter<$PrismaModel> | $Enums.gender_enum | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumgender_enumNullableFilter<$PrismaModel>
    _max?: NestedEnumgender_enumNullableFilter<$PrismaModel>
  }

  export type usersCreateWithoutDepartments_departments_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutDepartments_departments_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutDepartments_departments_managerIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDepartments_departments_managerIdTousersInput, usersUncheckedCreateWithoutDepartments_departments_managerIdTousersInput>
  }

  export type positionsCreateWithoutDepartmentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: usersCreateNestedManyWithoutPositionsInput
  }

  export type positionsUncheckedCreateWithoutDepartmentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: usersUncheckedCreateNestedManyWithoutPositionsInput
  }

  export type positionsCreateOrConnectWithoutDepartmentsInput = {
    where: positionsWhereUniqueInput
    create: XOR<positionsCreateWithoutDepartmentsInput, positionsUncheckedCreateWithoutDepartmentsInput>
  }

  export type positionsCreateManyDepartmentsInputEnvelope = {
    data: positionsCreateManyDepartmentsInput | positionsCreateManyDepartmentsInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutDepartments_users_departmentIdTodepartmentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput>
  }

  export type usersCreateManyDepartments_users_departmentIdTodepartmentsInputEnvelope = {
    data: usersCreateManyDepartments_users_departmentIdTodepartmentsInput | usersCreateManyDepartments_users_departmentIdTodepartmentsInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutDepartments_departments_managerIdTousersInput = {
    update: XOR<usersUpdateWithoutDepartments_departments_managerIdTousersInput, usersUncheckedUpdateWithoutDepartments_departments_managerIdTousersInput>
    create: XOR<usersCreateWithoutDepartments_departments_managerIdTousersInput, usersUncheckedCreateWithoutDepartments_departments_managerIdTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDepartments_departments_managerIdTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDepartments_departments_managerIdTousersInput, usersUncheckedUpdateWithoutDepartments_departments_managerIdTousersInput>
  }

  export type usersUpdateWithoutDepartments_departments_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDepartments_departments_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type positionsUpsertWithWhereUniqueWithoutDepartmentsInput = {
    where: positionsWhereUniqueInput
    update: XOR<positionsUpdateWithoutDepartmentsInput, positionsUncheckedUpdateWithoutDepartmentsInput>
    create: XOR<positionsCreateWithoutDepartmentsInput, positionsUncheckedCreateWithoutDepartmentsInput>
  }

  export type positionsUpdateWithWhereUniqueWithoutDepartmentsInput = {
    where: positionsWhereUniqueInput
    data: XOR<positionsUpdateWithoutDepartmentsInput, positionsUncheckedUpdateWithoutDepartmentsInput>
  }

  export type positionsUpdateManyWithWhereWithoutDepartmentsInput = {
    where: positionsScalarWhereInput
    data: XOR<positionsUpdateManyMutationInput, positionsUncheckedUpdateManyWithoutDepartmentsInput>
  }

  export type positionsScalarWhereInput = {
    AND?: positionsScalarWhereInput | positionsScalarWhereInput[]
    OR?: positionsScalarWhereInput[]
    NOT?: positionsScalarWhereInput | positionsScalarWhereInput[]
    id?: UuidFilter<"positions"> | string
    name?: StringFilter<"positions"> | string
    description?: StringNullableFilter<"positions"> | string | null
    isActive?: BoolFilter<"positions"> | boolean
    departmentId?: UuidNullableFilter<"positions"> | string | null
    level?: IntFilter<"positions"> | number
    createdAt?: DateTimeFilter<"positions"> | Date | string
    updatedAt?: DateTimeFilter<"positions"> | Date | string
  }

  export type usersUpsertWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedUpdateWithoutDepartments_users_departmentIdTodepartmentsInput>
    create: XOR<usersCreateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedCreateWithoutDepartments_users_departmentIdTodepartmentsInput>
  }

  export type usersUpdateWithWhereUniqueWithoutDepartments_users_departmentIdTodepartmentsInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutDepartments_users_departmentIdTodepartmentsInput, usersUncheckedUpdateWithoutDepartments_users_departmentIdTodepartmentsInput>
  }

  export type usersUpdateManyWithWhereWithoutDepartments_users_departmentIdTodepartmentsInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutDepartments_users_departmentIdTodepartmentsInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    id?: UuidFilter<"users"> | string
    firstName?: StringFilter<"users"> | string
    lastName?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    phoneNumber?: StringNullableFilter<"users"> | string | null
    address?: StringNullableFilter<"users"> | string | null
    role?: Enumuser_role_enumFilter<"users"> | $Enums.user_role_enum
    level?: Enumuser_level_enumFilter<"users"> | $Enums.user_level_enum
    gender?: Enumgender_enumNullableFilter<"users"> | $Enums.gender_enum | null
    managerId?: UuidNullableFilter<"users"> | string | null
    department?: StringNullableFilter<"users"> | string | null
    position?: StringNullableFilter<"users"> | string | null
    roleId?: UuidNullableFilter<"users"> | string | null
    departmentId?: UuidNullableFilter<"users"> | string | null
    positionId?: UuidNullableFilter<"users"> | string | null
    isActive?: BoolFilter<"users"> | boolean
    createdAt?: DateTimeFilter<"users"> | Date | string
    updatedAt?: DateTimeFilter<"users"> | Date | string
    hrId?: UuidNullableFilter<"users"> | string | null
    teamLeadId?: UuidNullableFilter<"users"> | string | null
  }

  export type leave_typesCreateWithoutLeave_balancesInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_requests?: leave_requestsCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUncheckedCreateWithoutLeave_balancesInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_requests?: leave_requestsUncheckedCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesCreateOrConnectWithoutLeave_balancesInput = {
    where: leave_typesWhereUniqueInput
    create: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
  }

  export type usersCreateWithoutLeave_balancesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutLeave_balancesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutLeave_balancesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
  }

  export type leave_typesUpsertWithoutLeave_balancesInput = {
    update: XOR<leave_typesUpdateWithoutLeave_balancesInput, leave_typesUncheckedUpdateWithoutLeave_balancesInput>
    create: XOR<leave_typesCreateWithoutLeave_balancesInput, leave_typesUncheckedCreateWithoutLeave_balancesInput>
    where?: leave_typesWhereInput
  }

  export type leave_typesUpdateToOneWithWhereWithoutLeave_balancesInput = {
    where?: leave_typesWhereInput
    data: XOR<leave_typesUpdateWithoutLeave_balancesInput, leave_typesUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type leave_typesUpdateWithoutLeave_balancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_requests?: leave_requestsUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesUncheckedUpdateWithoutLeave_balancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_requests?: leave_requestsUncheckedUpdateManyWithoutLeave_typesNestedInput
  }

  export type usersUpsertWithoutLeave_balancesInput = {
    update: XOR<usersUpdateWithoutLeave_balancesInput, usersUncheckedUpdateWithoutLeave_balancesInput>
    create: XOR<usersCreateWithoutLeave_balancesInput, usersUncheckedCreateWithoutLeave_balancesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLeave_balancesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLeave_balancesInput, usersUncheckedUpdateWithoutLeave_balancesInput>
  }

  export type usersUpdateWithoutLeave_balancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutLeave_balancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersCreateWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_approverIdTousersInput>
  }

  export type leave_typesCreateWithoutLeave_requestsInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_balances?: leave_balancesCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesUncheckedCreateWithoutLeave_requestsInput = {
    id?: string
    name: string
    description: string
    defaultDays: number
    isCarryForward?: boolean
    maxCarryForwardDays?: number
    isActive?: boolean
    applicableGender?: string | null
    isHalfDayAllowed?: boolean
    isPaidLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutLeave_typesInput
  }

  export type leave_typesCreateOrConnectWithoutLeave_requestsInput = {
    where: leave_typesWhereUniqueInput
    create: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
  }

  export type usersCreateWithoutLeave_requests_leave_requests_userIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutLeave_requests_leave_requests_userIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutLeave_requests_leave_requests_userIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLeave_requests_leave_requests_userIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_userIdTousersInput>
  }

  export type usersUpsertWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    update: XOR<usersUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUncheckedUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput>
    create: XOR<usersCreateWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_approverIdTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput, usersUncheckedUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput>
  }

  export type usersUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutLeave_requests_leave_requests_approverIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type leave_typesUpsertWithoutLeave_requestsInput = {
    update: XOR<leave_typesUpdateWithoutLeave_requestsInput, leave_typesUncheckedUpdateWithoutLeave_requestsInput>
    create: XOR<leave_typesCreateWithoutLeave_requestsInput, leave_typesUncheckedCreateWithoutLeave_requestsInput>
    where?: leave_typesWhereInput
  }

  export type leave_typesUpdateToOneWithWhereWithoutLeave_requestsInput = {
    where?: leave_typesWhereInput
    data: XOR<leave_typesUpdateWithoutLeave_requestsInput, leave_typesUncheckedUpdateWithoutLeave_requestsInput>
  }

  export type leave_typesUpdateWithoutLeave_requestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_balances?: leave_balancesUpdateManyWithoutLeave_typesNestedInput
  }

  export type leave_typesUncheckedUpdateWithoutLeave_requestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    defaultDays?: IntFieldUpdateOperationsInput | number
    isCarryForward?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForwardDays?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    applicableGender?: NullableStringFieldUpdateOperationsInput | string | null
    isHalfDayAllowed?: BoolFieldUpdateOperationsInput | boolean
    isPaidLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutLeave_typesNestedInput
  }

  export type usersUpsertWithoutLeave_requests_leave_requests_userIdTousersInput = {
    update: XOR<usersUpdateWithoutLeave_requests_leave_requests_userIdTousersInput, usersUncheckedUpdateWithoutLeave_requests_leave_requests_userIdTousersInput>
    create: XOR<usersCreateWithoutLeave_requests_leave_requests_userIdTousersInput, usersUncheckedCreateWithoutLeave_requests_leave_requests_userIdTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLeave_requests_leave_requests_userIdTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLeave_requests_leave_requests_userIdTousersInput, usersUncheckedUpdateWithoutLeave_requests_leave_requests_userIdTousersInput>
  }

  export type usersUpdateWithoutLeave_requests_leave_requests_userIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutLeave_requests_leave_requests_userIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type leave_balancesCreateWithoutLeave_typesInput = {
    id?: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
    users: usersCreateNestedOneWithoutLeave_balancesInput
  }

  export type leave_balancesUncheckedCreateWithoutLeave_typesInput = {
    id?: string
    userId: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_balancesCreateOrConnectWithoutLeave_typesInput = {
    where: leave_balancesWhereUniqueInput
    create: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_balancesCreateManyLeave_typesInputEnvelope = {
    data: leave_balancesCreateManyLeave_typesInput | leave_balancesCreateManyLeave_typesInput[]
    skipDuplicates?: boolean
  }

  export type leave_requestsCreateWithoutLeave_typesInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    users_leave_requests_approverIdTousers?: usersCreateNestedOneWithoutLeave_requests_leave_requests_approverIdTousersInput
    users_leave_requests_userIdTousers: usersCreateNestedOneWithoutLeave_requests_leave_requests_userIdTousersInput
  }

  export type leave_requestsUncheckedCreateWithoutLeave_typesInput = {
    id?: string
    userId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverId?: string | null
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsCreateOrConnectWithoutLeave_typesInput = {
    where: leave_requestsWhereUniqueInput
    create: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_requestsCreateManyLeave_typesInputEnvelope = {
    data: leave_requestsCreateManyLeave_typesInput | leave_requestsCreateManyLeave_typesInput[]
    skipDuplicates?: boolean
  }

  export type leave_balancesUpsertWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_balancesWhereUniqueInput
    update: XOR<leave_balancesUpdateWithoutLeave_typesInput, leave_balancesUncheckedUpdateWithoutLeave_typesInput>
    create: XOR<leave_balancesCreateWithoutLeave_typesInput, leave_balancesUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_balancesUpdateWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_balancesWhereUniqueInput
    data: XOR<leave_balancesUpdateWithoutLeave_typesInput, leave_balancesUncheckedUpdateWithoutLeave_typesInput>
  }

  export type leave_balancesUpdateManyWithWhereWithoutLeave_typesInput = {
    where: leave_balancesScalarWhereInput
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyWithoutLeave_typesInput>
  }

  export type leave_balancesScalarWhereInput = {
    AND?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
    OR?: leave_balancesScalarWhereInput[]
    NOT?: leave_balancesScalarWhereInput | leave_balancesScalarWhereInput[]
    id?: UuidFilter<"leave_balances"> | string
    userId?: UuidFilter<"leave_balances"> | string
    leaveTypeId?: UuidFilter<"leave_balances"> | string
    balance?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    used?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFilter<"leave_balances"> | Decimal | DecimalJsLike | number | string
    year?: IntFilter<"leave_balances"> | number
    createdAt?: DateTimeFilter<"leave_balances"> | Date | string
    updatedAt?: DateTimeFilter<"leave_balances"> | Date | string
  }

  export type leave_requestsUpsertWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_requestsWhereUniqueInput
    update: XOR<leave_requestsUpdateWithoutLeave_typesInput, leave_requestsUncheckedUpdateWithoutLeave_typesInput>
    create: XOR<leave_requestsCreateWithoutLeave_typesInput, leave_requestsUncheckedCreateWithoutLeave_typesInput>
  }

  export type leave_requestsUpdateWithWhereUniqueWithoutLeave_typesInput = {
    where: leave_requestsWhereUniqueInput
    data: XOR<leave_requestsUpdateWithoutLeave_typesInput, leave_requestsUncheckedUpdateWithoutLeave_typesInput>
  }

  export type leave_requestsUpdateManyWithWhereWithoutLeave_typesInput = {
    where: leave_requestsScalarWhereInput
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyWithoutLeave_typesInput>
  }

  export type leave_requestsScalarWhereInput = {
    AND?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
    OR?: leave_requestsScalarWhereInput[]
    NOT?: leave_requestsScalarWhereInput | leave_requestsScalarWhereInput[]
    id?: UuidFilter<"leave_requests"> | string
    userId?: UuidFilter<"leave_requests"> | string
    leaveTypeId?: UuidFilter<"leave_requests"> | string
    startDate?: DateTimeFilter<"leave_requests"> | Date | string
    endDate?: DateTimeFilter<"leave_requests"> | Date | string
    requestType?: Enumleave_request_type_enumFilter<"leave_requests"> | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFilter<"leave_requests"> | Decimal | DecimalJsLike | number | string
    reason?: StringFilter<"leave_requests"> | string
    status?: Enumleave_request_status_enumFilter<"leave_requests"> | $Enums.leave_request_status_enum
    approverId?: UuidNullableFilter<"leave_requests"> | string | null
    approverComments?: StringNullableFilter<"leave_requests"> | string | null
    approvedAt?: DateTimeNullableFilter<"leave_requests"> | Date | string | null
    createdAt?: DateTimeFilter<"leave_requests"> | Date | string
    updatedAt?: DateTimeFilter<"leave_requests"> | Date | string
    metadata?: JsonNullableFilter<"leave_requests">
  }

  export type departmentsCreateWithoutPositionsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users_departments_managerIdTousers?: usersCreateNestedOneWithoutDepartments_departments_managerIdTousersInput
    users_users_departmentIdTodepartments?: usersCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput
  }

  export type departmentsUncheckedCreateWithoutPositionsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    managerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users_users_departmentIdTodepartments?: usersUncheckedCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput
  }

  export type departmentsCreateOrConnectWithoutPositionsInput = {
    where: departmentsWhereUniqueInput
    create: XOR<departmentsCreateWithoutPositionsInput, departmentsUncheckedCreateWithoutPositionsInput>
  }

  export type usersCreateWithoutPositionsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutPositionsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutPositionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPositionsInput, usersUncheckedCreateWithoutPositionsInput>
  }

  export type usersCreateManyPositionsInputEnvelope = {
    data: usersCreateManyPositionsInput | usersCreateManyPositionsInput[]
    skipDuplicates?: boolean
  }

  export type departmentsUpsertWithoutPositionsInput = {
    update: XOR<departmentsUpdateWithoutPositionsInput, departmentsUncheckedUpdateWithoutPositionsInput>
    create: XOR<departmentsCreateWithoutPositionsInput, departmentsUncheckedCreateWithoutPositionsInput>
    where?: departmentsWhereInput
  }

  export type departmentsUpdateToOneWithWhereWithoutPositionsInput = {
    where?: departmentsWhereInput
    data: XOR<departmentsUpdateWithoutPositionsInput, departmentsUncheckedUpdateWithoutPositionsInput>
  }

  export type departmentsUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users_departments_managerIdTousers?: usersUpdateOneWithoutDepartments_departments_managerIdTousersNestedInput
    users_users_departmentIdTodepartments?: usersUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput
  }

  export type departmentsUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users_users_departmentIdTodepartments?: usersUncheckedUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput
  }

  export type usersUpsertWithWhereUniqueWithoutPositionsInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutPositionsInput, usersUncheckedUpdateWithoutPositionsInput>
    create: XOR<usersCreateWithoutPositionsInput, usersUncheckedCreateWithoutPositionsInput>
  }

  export type usersUpdateWithWhereUniqueWithoutPositionsInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutPositionsInput, usersUncheckedUpdateWithoutPositionsInput>
  }

  export type usersUpdateManyWithWhereWithoutPositionsInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutPositionsInput>
  }

  export type usersCreateWithoutRolesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutRolesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutRolesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput>
  }

  export type usersCreateManyRolesInputEnvelope = {
    data: usersCreateManyRolesInput | usersCreateManyRolesInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithWhereUniqueWithoutRolesInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutRolesInput, usersUncheckedUpdateWithoutRolesInput>
    create: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput>
  }

  export type usersUpdateWithWhereUniqueWithoutRolesInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutRolesInput, usersUncheckedUpdateWithoutRolesInput>
  }

  export type usersUpdateManyWithWhereWithoutRolesInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutRolesInput>
  }

  export type departmentsCreateWithoutUsers_departments_managerIdTousersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: positionsCreateNestedManyWithoutDepartmentsInput
    users_users_departmentIdTodepartments?: usersCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput
  }

  export type departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: positionsUncheckedCreateNestedManyWithoutDepartmentsInput
    users_users_departmentIdTodepartments?: usersUncheckedCreateNestedManyWithoutDepartments_users_departmentIdTodepartmentsInput
  }

  export type departmentsCreateOrConnectWithoutUsers_departments_managerIdTousersInput = {
    where: departmentsWhereUniqueInput
    create: XOR<departmentsCreateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput>
  }

  export type departmentsCreateManyUsers_departments_managerIdTousersInputEnvelope = {
    data: departmentsCreateManyUsers_departments_managerIdTousersInput | departmentsCreateManyUsers_departments_managerIdTousersInput[]
    skipDuplicates?: boolean
  }

  export type leave_balancesCreateWithoutUsersInput = {
    id?: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leave_types: leave_typesCreateNestedOneWithoutLeave_balancesInput
  }

  export type leave_balancesUncheckedCreateWithoutUsersInput = {
    id?: string
    leaveTypeId: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_balancesCreateOrConnectWithoutUsersInput = {
    where: leave_balancesWhereUniqueInput
    create: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput>
  }

  export type leave_balancesCreateManyUsersInputEnvelope = {
    data: leave_balancesCreateManyUsersInput | leave_balancesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    leave_types: leave_typesCreateNestedOneWithoutLeave_requestsInput
    users_leave_requests_userIdTousers: usersCreateNestedOneWithoutLeave_requests_leave_requests_userIdTousersInput
  }

  export type leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput = {
    id?: string
    userId: string
    leaveTypeId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsCreateOrConnectWithoutUsers_leave_requests_approverIdTousersInput = {
    where: leave_requestsWhereUniqueInput
    create: XOR<leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput>
  }

  export type leave_requestsCreateManyUsers_leave_requests_approverIdTousersInputEnvelope = {
    data: leave_requestsCreateManyUsers_leave_requests_approverIdTousersInput | leave_requestsCreateManyUsers_leave_requests_approverIdTousersInput[]
    skipDuplicates?: boolean
  }

  export type leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput = {
    id?: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    users_leave_requests_approverIdTousers?: usersCreateNestedOneWithoutLeave_requests_leave_requests_approverIdTousersInput
    leave_types: leave_typesCreateNestedOneWithoutLeave_requestsInput
  }

  export type leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput = {
    id?: string
    leaveTypeId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverId?: string | null
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsCreateOrConnectWithoutUsers_leave_requests_userIdTousersInput = {
    where: leave_requestsWhereUniqueInput
    create: XOR<leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput>
  }

  export type leave_requestsCreateManyUsers_leave_requests_userIdTousersInputEnvelope = {
    data: leave_requestsCreateManyUsers_leave_requests_userIdTousersInput | leave_requestsCreateManyUsers_leave_requests_userIdTousersInput[]
    skipDuplicates?: boolean
  }

  export type departmentsCreateWithoutUsers_users_departmentIdTodepartmentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users_departments_managerIdTousers?: usersCreateNestedOneWithoutDepartments_departments_managerIdTousersInput
    positions?: positionsCreateNestedManyWithoutDepartmentsInput
  }

  export type departmentsUncheckedCreateWithoutUsers_users_departmentIdTodepartmentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    managerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    positions?: positionsUncheckedCreateNestedManyWithoutDepartmentsInput
  }

  export type departmentsCreateOrConnectWithoutUsers_users_departmentIdTodepartmentsInput = {
    where: departmentsWhereUniqueInput
    create: XOR<departmentsCreateWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUncheckedCreateWithoutUsers_users_departmentIdTodepartmentsInput>
  }

  export type usersCreateWithoutOther_users_users_hrIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutOther_users_users_hrIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutOther_users_users_hrIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutOther_users_users_hrIdTousersInput, usersUncheckedCreateWithoutOther_users_users_hrIdTousersInput>
  }

  export type usersCreateWithoutUsers_users_hrIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutUsers_users_hrIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutUsers_users_hrIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUsers_users_hrIdTousersInput, usersUncheckedCreateWithoutUsers_users_hrIdTousersInput>
  }

  export type usersCreateManyUsers_users_hrIdTousersInputEnvelope = {
    data: usersCreateManyUsers_users_hrIdTousersInput | usersCreateManyUsers_users_hrIdTousersInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutOther_users_users_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutOther_users_users_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutOther_users_users_managerIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutOther_users_users_managerIdTousersInput, usersUncheckedCreateWithoutOther_users_users_managerIdTousersInput>
  }

  export type usersCreateWithoutUsers_users_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutUsers_users_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutUsers_users_managerIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUsers_users_managerIdTousersInput, usersUncheckedCreateWithoutUsers_users_managerIdTousersInput>
  }

  export type usersCreateManyUsers_users_managerIdTousersInputEnvelope = {
    data: usersCreateManyUsers_users_managerIdTousersInput | usersCreateManyUsers_users_managerIdTousersInput[]
    skipDuplicates?: boolean
  }

  export type positionsCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    departments?: departmentsCreateNestedOneWithoutPositionsInput
  }

  export type positionsUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    departmentId?: string | null
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type positionsCreateOrConnectWithoutUsersInput = {
    where: positionsWhereUniqueInput
    create: XOR<positionsCreateWithoutUsersInput, positionsUncheckedCreateWithoutUsersInput>
  }

  export type rolesCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    permissions?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type rolesUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    permissions?: string | null
    isSystem?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type rolesCreateOrConnectWithoutUsersInput = {
    where: rolesWhereUniqueInput
    create: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
  }

  export type usersCreateWithoutOther_users_users_teamLeadIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    users_users_teamLeadIdTousers?: usersCreateNestedOneWithoutOther_users_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutOther_users_users_teamLeadIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
  }

  export type usersCreateOrConnectWithoutOther_users_users_teamLeadIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutOther_users_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutOther_users_users_teamLeadIdTousersInput>
  }

  export type usersCreateWithoutUsers_users_teamLeadIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    departments_departments_managerIdTousers?: departmentsCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    departments_users_departmentIdTodepartments?: departmentsCreateNestedOneWithoutUsers_users_departmentIdTodepartmentsInput
    users_users_hrIdTousers?: usersCreateNestedOneWithoutOther_users_users_hrIdTousersInput
    other_users_users_hrIdTousers?: usersCreateNestedManyWithoutUsers_users_hrIdTousersInput
    users_users_managerIdTousers?: usersCreateNestedOneWithoutOther_users_users_managerIdTousersInput
    other_users_users_managerIdTousers?: usersCreateNestedManyWithoutUsers_users_managerIdTousersInput
    positions?: positionsCreateNestedOneWithoutUsersInput
    roles?: rolesCreateNestedOneWithoutUsersInput
    other_users_users_teamLeadIdTousers?: usersCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    departments_departments_managerIdTousers?: departmentsUncheckedCreateNestedManyWithoutUsers_departments_managerIdTousersInput
    leave_balances?: leave_balancesUncheckedCreateNestedManyWithoutUsersInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_approverIdTousersInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedCreateNestedManyWithoutUsers_leave_requests_userIdTousersInput
    other_users_users_hrIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_hrIdTousersInput
    other_users_users_managerIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_managerIdTousersInput
    other_users_users_teamLeadIdTousers?: usersUncheckedCreateNestedManyWithoutUsers_users_teamLeadIdTousersInput
  }

  export type usersCreateOrConnectWithoutUsers_users_teamLeadIdTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput>
  }

  export type usersCreateManyUsers_users_teamLeadIdTousersInputEnvelope = {
    data: usersCreateManyUsers_users_teamLeadIdTousersInput | usersCreateManyUsers_users_teamLeadIdTousersInput[]
    skipDuplicates?: boolean
  }

  export type departmentsUpsertWithWhereUniqueWithoutUsers_departments_managerIdTousersInput = {
    where: departmentsWhereUniqueInput
    update: XOR<departmentsUpdateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedUpdateWithoutUsers_departments_managerIdTousersInput>
    create: XOR<departmentsCreateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedCreateWithoutUsers_departments_managerIdTousersInput>
  }

  export type departmentsUpdateWithWhereUniqueWithoutUsers_departments_managerIdTousersInput = {
    where: departmentsWhereUniqueInput
    data: XOR<departmentsUpdateWithoutUsers_departments_managerIdTousersInput, departmentsUncheckedUpdateWithoutUsers_departments_managerIdTousersInput>
  }

  export type departmentsUpdateManyWithWhereWithoutUsers_departments_managerIdTousersInput = {
    where: departmentsScalarWhereInput
    data: XOR<departmentsUpdateManyMutationInput, departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersInput>
  }

  export type departmentsScalarWhereInput = {
    AND?: departmentsScalarWhereInput | departmentsScalarWhereInput[]
    OR?: departmentsScalarWhereInput[]
    NOT?: departmentsScalarWhereInput | departmentsScalarWhereInput[]
    id?: UuidFilter<"departments"> | string
    name?: StringFilter<"departments"> | string
    description?: StringNullableFilter<"departments"> | string | null
    isActive?: BoolFilter<"departments"> | boolean
    managerId?: UuidNullableFilter<"departments"> | string | null
    createdAt?: DateTimeFilter<"departments"> | Date | string
    updatedAt?: DateTimeFilter<"departments"> | Date | string
  }

  export type leave_balancesUpsertWithWhereUniqueWithoutUsersInput = {
    where: leave_balancesWhereUniqueInput
    update: XOR<leave_balancesUpdateWithoutUsersInput, leave_balancesUncheckedUpdateWithoutUsersInput>
    create: XOR<leave_balancesCreateWithoutUsersInput, leave_balancesUncheckedCreateWithoutUsersInput>
  }

  export type leave_balancesUpdateWithWhereUniqueWithoutUsersInput = {
    where: leave_balancesWhereUniqueInput
    data: XOR<leave_balancesUpdateWithoutUsersInput, leave_balancesUncheckedUpdateWithoutUsersInput>
  }

  export type leave_balancesUpdateManyWithWhereWithoutUsersInput = {
    where: leave_balancesScalarWhereInput
    data: XOR<leave_balancesUpdateManyMutationInput, leave_balancesUncheckedUpdateManyWithoutUsersInput>
  }

  export type leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput = {
    where: leave_requestsWhereUniqueInput
    update: XOR<leave_requestsUpdateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedUpdateWithoutUsers_leave_requests_approverIdTousersInput>
    create: XOR<leave_requestsCreateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_approverIdTousersInput>
  }

  export type leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_approverIdTousersInput = {
    where: leave_requestsWhereUniqueInput
    data: XOR<leave_requestsUpdateWithoutUsers_leave_requests_approverIdTousersInput, leave_requestsUncheckedUpdateWithoutUsers_leave_requests_approverIdTousersInput>
  }

  export type leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_approverIdTousersInput = {
    where: leave_requestsScalarWhereInput
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersInput>
  }

  export type leave_requestsUpsertWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput = {
    where: leave_requestsWhereUniqueInput
    update: XOR<leave_requestsUpdateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedUpdateWithoutUsers_leave_requests_userIdTousersInput>
    create: XOR<leave_requestsCreateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedCreateWithoutUsers_leave_requests_userIdTousersInput>
  }

  export type leave_requestsUpdateWithWhereUniqueWithoutUsers_leave_requests_userIdTousersInput = {
    where: leave_requestsWhereUniqueInput
    data: XOR<leave_requestsUpdateWithoutUsers_leave_requests_userIdTousersInput, leave_requestsUncheckedUpdateWithoutUsers_leave_requests_userIdTousersInput>
  }

  export type leave_requestsUpdateManyWithWhereWithoutUsers_leave_requests_userIdTousersInput = {
    where: leave_requestsScalarWhereInput
    data: XOR<leave_requestsUpdateManyMutationInput, leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersInput>
  }

  export type departmentsUpsertWithoutUsers_users_departmentIdTodepartmentsInput = {
    update: XOR<departmentsUpdateWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUncheckedUpdateWithoutUsers_users_departmentIdTodepartmentsInput>
    create: XOR<departmentsCreateWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUncheckedCreateWithoutUsers_users_departmentIdTodepartmentsInput>
    where?: departmentsWhereInput
  }

  export type departmentsUpdateToOneWithWhereWithoutUsers_users_departmentIdTodepartmentsInput = {
    where?: departmentsWhereInput
    data: XOR<departmentsUpdateWithoutUsers_users_departmentIdTodepartmentsInput, departmentsUncheckedUpdateWithoutUsers_users_departmentIdTodepartmentsInput>
  }

  export type departmentsUpdateWithoutUsers_users_departmentIdTodepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users_departments_managerIdTousers?: usersUpdateOneWithoutDepartments_departments_managerIdTousersNestedInput
    positions?: positionsUpdateManyWithoutDepartmentsNestedInput
  }

  export type departmentsUncheckedUpdateWithoutUsers_users_departmentIdTodepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: positionsUncheckedUpdateManyWithoutDepartmentsNestedInput
  }

  export type usersUpsertWithoutOther_users_users_hrIdTousersInput = {
    update: XOR<usersUpdateWithoutOther_users_users_hrIdTousersInput, usersUncheckedUpdateWithoutOther_users_users_hrIdTousersInput>
    create: XOR<usersCreateWithoutOther_users_users_hrIdTousersInput, usersUncheckedCreateWithoutOther_users_users_hrIdTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutOther_users_users_hrIdTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutOther_users_users_hrIdTousersInput, usersUncheckedUpdateWithoutOther_users_users_hrIdTousersInput>
  }

  export type usersUpdateWithoutOther_users_users_hrIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutOther_users_users_hrIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUpsertWithWhereUniqueWithoutUsers_users_hrIdTousersInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutUsers_users_hrIdTousersInput, usersUncheckedUpdateWithoutUsers_users_hrIdTousersInput>
    create: XOR<usersCreateWithoutUsers_users_hrIdTousersInput, usersUncheckedCreateWithoutUsers_users_hrIdTousersInput>
  }

  export type usersUpdateWithWhereUniqueWithoutUsers_users_hrIdTousersInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutUsers_users_hrIdTousersInput, usersUncheckedUpdateWithoutUsers_users_hrIdTousersInput>
  }

  export type usersUpdateManyWithWhereWithoutUsers_users_hrIdTousersInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersInput>
  }

  export type usersUpsertWithoutOther_users_users_managerIdTousersInput = {
    update: XOR<usersUpdateWithoutOther_users_users_managerIdTousersInput, usersUncheckedUpdateWithoutOther_users_users_managerIdTousersInput>
    create: XOR<usersCreateWithoutOther_users_users_managerIdTousersInput, usersUncheckedCreateWithoutOther_users_users_managerIdTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutOther_users_users_managerIdTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutOther_users_users_managerIdTousersInput, usersUncheckedUpdateWithoutOther_users_users_managerIdTousersInput>
  }

  export type usersUpdateWithoutOther_users_users_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutOther_users_users_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUpsertWithWhereUniqueWithoutUsers_users_managerIdTousersInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutUsers_users_managerIdTousersInput, usersUncheckedUpdateWithoutUsers_users_managerIdTousersInput>
    create: XOR<usersCreateWithoutUsers_users_managerIdTousersInput, usersUncheckedCreateWithoutUsers_users_managerIdTousersInput>
  }

  export type usersUpdateWithWhereUniqueWithoutUsers_users_managerIdTousersInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutUsers_users_managerIdTousersInput, usersUncheckedUpdateWithoutUsers_users_managerIdTousersInput>
  }

  export type usersUpdateManyWithWhereWithoutUsers_users_managerIdTousersInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersInput>
  }

  export type positionsUpsertWithoutUsersInput = {
    update: XOR<positionsUpdateWithoutUsersInput, positionsUncheckedUpdateWithoutUsersInput>
    create: XOR<positionsCreateWithoutUsersInput, positionsUncheckedCreateWithoutUsersInput>
    where?: positionsWhereInput
  }

  export type positionsUpdateToOneWithWhereWithoutUsersInput = {
    where?: positionsWhereInput
    data: XOR<positionsUpdateWithoutUsersInput, positionsUncheckedUpdateWithoutUsersInput>
  }

  export type positionsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments?: departmentsUpdateOneWithoutPositionsNestedInput
  }

  export type positionsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type rolesUpsertWithoutUsersInput = {
    update: XOR<rolesUpdateWithoutUsersInput, rolesUncheckedUpdateWithoutUsersInput>
    create: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    where?: rolesWhereInput
  }

  export type rolesUpdateToOneWithWhereWithoutUsersInput = {
    where?: rolesWhereInput
    data: XOR<rolesUpdateWithoutUsersInput, rolesUncheckedUpdateWithoutUsersInput>
  }

  export type rolesUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permissions?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type rolesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    permissions?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUpsertWithoutOther_users_users_teamLeadIdTousersInput = {
    update: XOR<usersUpdateWithoutOther_users_users_teamLeadIdTousersInput, usersUncheckedUpdateWithoutOther_users_users_teamLeadIdTousersInput>
    create: XOR<usersCreateWithoutOther_users_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutOther_users_users_teamLeadIdTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutOther_users_users_teamLeadIdTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutOther_users_users_teamLeadIdTousersInput, usersUncheckedUpdateWithoutOther_users_users_teamLeadIdTousersInput>
  }

  export type usersUpdateWithoutOther_users_users_teamLeadIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutOther_users_users_teamLeadIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
  }

  export type usersUpsertWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedUpdateWithoutUsers_users_teamLeadIdTousersInput>
    create: XOR<usersCreateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedCreateWithoutUsers_users_teamLeadIdTousersInput>
  }

  export type usersUpdateWithWhereUniqueWithoutUsers_users_teamLeadIdTousersInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutUsers_users_teamLeadIdTousersInput, usersUncheckedUpdateWithoutUsers_users_teamLeadIdTousersInput>
  }

  export type usersUpdateManyWithWhereWithoutUsers_users_teamLeadIdTousersInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersInput>
  }

  export type positionsCreateManyDepartmentsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    level?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type usersCreateManyDepartments_users_departmentIdTodepartmentsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
  }

  export type positionsUpdateWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateManyWithoutPositionsNestedInput
  }

  export type positionsUncheckedUpdateWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUncheckedUpdateManyWithoutPositionsNestedInput
  }

  export type positionsUncheckedUpdateManyWithoutDepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    level?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUpdateWithoutDepartments_users_departmentIdTodepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDepartments_users_departmentIdTodepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutDepartments_users_departmentIdTodepartmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type leave_balancesCreateManyLeave_typesInput = {
    id?: string
    userId: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_requestsCreateManyLeave_typesInput = {
    id?: string
    userId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverId?: string | null
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_balancesUpdateWithoutLeave_typesInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutLeave_balancesNestedInput
  }

  export type leave_balancesUncheckedUpdateWithoutLeave_typesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_balancesUncheckedUpdateManyWithoutLeave_typesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_requestsUpdateWithoutLeave_typesInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    users_leave_requests_approverIdTousers?: usersUpdateOneWithoutLeave_requests_leave_requests_approverIdTousersNestedInput
    users_leave_requests_userIdTousers?: usersUpdateOneRequiredWithoutLeave_requests_leave_requests_userIdTousersNestedInput
  }

  export type leave_requestsUncheckedUpdateWithoutLeave_typesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUncheckedUpdateManyWithoutLeave_typesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usersCreateManyPositionsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
  }

  export type usersUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutPositionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateManyRolesInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
  }

  export type usersUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type departmentsCreateManyUsers_departments_managerIdTousersInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_balancesCreateManyUsersInput = {
    id?: string
    leaveTypeId: string
    balance: Decimal | DecimalJsLike | number | string
    used?: Decimal | DecimalJsLike | number | string
    carryForward?: Decimal | DecimalJsLike | number | string
    year: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type leave_requestsCreateManyUsers_leave_requests_approverIdTousersInput = {
    id?: string
    userId: string
    leaveTypeId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsCreateManyUsers_leave_requests_userIdTousersInput = {
    id?: string
    leaveTypeId: string
    startDate: Date | string
    endDate: Date | string
    requestType?: $Enums.leave_request_type_enum
    numberOfDays: Decimal | DecimalJsLike | number | string
    reason: string
    status?: $Enums.leave_request_status_enum
    approverId?: string | null
    approverComments?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usersCreateManyUsers_users_hrIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    teamLeadId?: string | null
  }

  export type usersCreateManyUsers_users_managerIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
    teamLeadId?: string | null
  }

  export type usersCreateManyUsers_users_teamLeadIdTousersInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    role?: $Enums.user_role_enum
    level?: $Enums.user_level_enum
    gender?: $Enums.gender_enum | null
    managerId?: string | null
    department?: string | null
    position?: string | null
    roleId?: string | null
    departmentId?: string | null
    positionId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    hrId?: string | null
  }

  export type departmentsUpdateWithoutUsers_departments_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: positionsUpdateManyWithoutDepartmentsNestedInput
    users_users_departmentIdTodepartments?: usersUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput
  }

  export type departmentsUncheckedUpdateWithoutUsers_departments_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    positions?: positionsUncheckedUpdateManyWithoutDepartmentsNestedInput
    users_users_departmentIdTodepartments?: usersUncheckedUpdateManyWithoutDepartments_users_departmentIdTodepartmentsNestedInput
  }

  export type departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_balancesUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_balancesNestedInput
  }

  export type leave_balancesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_balancesUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    used?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    carryForward?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    year?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type leave_requestsUpdateWithoutUsers_leave_requests_approverIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput
    users_leave_requests_userIdTousers?: usersUpdateOneRequiredWithoutLeave_requests_leave_requests_userIdTousersNestedInput
  }

  export type leave_requestsUncheckedUpdateWithoutUsers_leave_requests_approverIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUpdateWithoutUsers_leave_requests_userIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    users_leave_requests_approverIdTousers?: usersUpdateOneWithoutLeave_requests_leave_requests_approverIdTousersNestedInput
    leave_types?: leave_typesUpdateOneRequiredWithoutLeave_requestsNestedInput
  }

  export type leave_requestsUncheckedUpdateWithoutUsers_leave_requests_userIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveTypeId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    requestType?: Enumleave_request_type_enumFieldUpdateOperationsInput | $Enums.leave_request_type_enum
    numberOfDays?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: Enumleave_request_status_enumFieldUpdateOperationsInput | $Enums.leave_request_status_enum
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    approverComments?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usersUpdateWithoutUsers_users_hrIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutUsers_users_hrIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUpdateWithoutUsers_users_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    users_users_teamLeadIdTousers?: usersUpdateOneWithoutOther_users_users_teamLeadIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutUsers_users_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    teamLeadId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUpdateWithoutUsers_users_teamLeadIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    departments_departments_managerIdTousers?: departmentsUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    departments_users_departmentIdTodepartments?: departmentsUpdateOneWithoutUsers_users_departmentIdTodepartmentsNestedInput
    users_users_hrIdTousers?: usersUpdateOneWithoutOther_users_users_hrIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    users_users_managerIdTousers?: usersUpdateOneWithoutOther_users_users_managerIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    positions?: positionsUpdateOneWithoutUsersNestedInput
    roles?: rolesUpdateOneWithoutUsersNestedInput
    other_users_users_teamLeadIdTousers?: usersUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutUsers_users_teamLeadIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departments_departments_managerIdTousers?: departmentsUncheckedUpdateManyWithoutUsers_departments_managerIdTousersNestedInput
    leave_balances?: leave_balancesUncheckedUpdateManyWithoutUsersNestedInput
    leave_requests_leave_requests_approverIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_approverIdTousersNestedInput
    leave_requests_leave_requests_userIdTousers?: leave_requestsUncheckedUpdateManyWithoutUsers_leave_requests_userIdTousersNestedInput
    other_users_users_hrIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_hrIdTousersNestedInput
    other_users_users_managerIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_managerIdTousersNestedInput
    other_users_users_teamLeadIdTousers?: usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutUsers_users_teamLeadIdTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: Enumuser_role_enumFieldUpdateOperationsInput | $Enums.user_role_enum
    level?: Enumuser_level_enumFieldUpdateOperationsInput | $Enums.user_level_enum
    gender?: NullableEnumgender_enumFieldUpdateOperationsInput | $Enums.gender_enum | null
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    positionId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}