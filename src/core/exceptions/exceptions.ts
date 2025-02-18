export class ClientSideException extends Error {}
export class ServerSideException extends Error {}
export class DatabaseException extends ServerSideException {}
export class NotFoundException extends ClientSideException {}
export class BadRequestException extends ClientSideException {}
export class MissingParameterException extends BadRequestException {}
export class InvalidParameterException extends BadRequestException {}
export class MissingConfigurationException extends ServerSideException {}
export class AuthenticationException extends ClientSideException {}
export class StorageException extends ServerSideException {}
