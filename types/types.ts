export type RouteType = `${string}/${string}`

export type RoutesType = {
    auth: RouteType;
    users: RouteType;
    events: RouteType;

}