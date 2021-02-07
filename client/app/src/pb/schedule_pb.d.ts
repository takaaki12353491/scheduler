import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Schedule extends jspb.Message {
  getId(): string;
  setId(value: string): Schedule;

  getUserId(): string;
  setUserId(value: string): Schedule;

  getTitle(): string;
  setTitle(value: string): Schedule;

  getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDate(value?: google_protobuf_timestamp_pb.Timestamp): Schedule;
  hasDate(): boolean;
  clearDate(): Schedule;

  getLocation(): string;
  setLocation(value: string): Schedule;

  getDescription(): string;
  setDescription(value: string): Schedule;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Schedule.AsObject;
  static toObject(includeInstance: boolean, msg: Schedule): Schedule.AsObject;
  static serializeBinaryToWriter(message: Schedule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Schedule;
  static deserializeBinaryFromReader(message: Schedule, reader: jspb.BinaryReader): Schedule;
}

export namespace Schedule {
  export type AsObject = {
    id: string,
    userId: string,
    title: string,
    date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    location: string,
    description: string,
  }
}

export class IndexRequest extends jspb.Message {
  getName(): string;
  setName(value: string): IndexRequest;

  getMonth(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setMonth(value?: google_protobuf_timestamp_pb.Timestamp): IndexRequest;
  hasMonth(): boolean;
  clearMonth(): IndexRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IndexRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IndexRequest): IndexRequest.AsObject;
  static serializeBinaryToWriter(message: IndexRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IndexRequest;
  static deserializeBinaryFromReader(message: IndexRequest, reader: jspb.BinaryReader): IndexRequest;
}

export namespace IndexRequest {
  export type AsObject = {
    name: string,
    month?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class IndexResponse extends jspb.Message {
  getSchedulesList(): Array<Schedule>;
  setSchedulesList(value: Array<Schedule>): IndexResponse;
  clearSchedulesList(): IndexResponse;
  addSchedules(value?: Schedule, index?: number): Schedule;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IndexResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IndexResponse): IndexResponse.AsObject;
  static serializeBinaryToWriter(message: IndexResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IndexResponse;
  static deserializeBinaryFromReader(message: IndexResponse, reader: jspb.BinaryReader): IndexResponse;
}

export namespace IndexResponse {
  export type AsObject = {
    schedulesList: Array<Schedule.AsObject>,
  }
}

export class ShowRequest extends jspb.Message {
  getId(): string;
  setId(value: string): ShowRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShowRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ShowRequest): ShowRequest.AsObject;
  static serializeBinaryToWriter(message: ShowRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShowRequest;
  static deserializeBinaryFromReader(message: ShowRequest, reader: jspb.BinaryReader): ShowRequest;
}

export namespace ShowRequest {
  export type AsObject = {
    id: string,
  }
}

export class ShowResponse extends jspb.Message {
  getSchedule(): Schedule | undefined;
  setSchedule(value?: Schedule): ShowResponse;
  hasSchedule(): boolean;
  clearSchedule(): ShowResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShowResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ShowResponse): ShowResponse.AsObject;
  static serializeBinaryToWriter(message: ShowResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShowResponse;
  static deserializeBinaryFromReader(message: ShowResponse, reader: jspb.BinaryReader): ShowResponse;
}

export namespace ShowResponse {
  export type AsObject = {
    schedule?: Schedule.AsObject,
  }
}

export class CreateRequest extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): CreateRequest;

  getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDate(value?: google_protobuf_timestamp_pb.Timestamp): CreateRequest;
  hasDate(): boolean;
  clearDate(): CreateRequest;

  getLocation(): string;
  setLocation(value: string): CreateRequest;

  getDescription(): string;
  setDescription(value: string): CreateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    title: string,
    date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    location: string,
    description: string,
  }
}

export class CreateResponse extends jspb.Message {
  getSchedule(): Schedule | undefined;
  setSchedule(value?: Schedule): CreateResponse;
  hasSchedule(): boolean;
  clearSchedule(): CreateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
  static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateResponse;
  static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
  export type AsObject = {
    schedule?: Schedule.AsObject,
  }
}

export class UpdateRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateRequest;

  getTitle(): string;
  setTitle(value: string): UpdateRequest;

  getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDate(value?: google_protobuf_timestamp_pb.Timestamp): UpdateRequest;
  hasDate(): boolean;
  clearDate(): UpdateRequest;

  getLocation(): string;
  setLocation(value: string): UpdateRequest;

  getDescription(): string;
  setDescription(value: string): UpdateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequest;
  static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    id: string,
    title: string,
    date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    location: string,
    description: string,
  }
}

export class UpdateResponse extends jspb.Message {
  getSchedule(): Schedule | undefined;
  setSchedule(value?: Schedule): UpdateResponse;
  hasSchedule(): boolean;
  clearSchedule(): UpdateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateResponse): UpdateResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateResponse;
  static deserializeBinaryFromReader(message: UpdateResponse, reader: jspb.BinaryReader): UpdateResponse;
}

export namespace UpdateResponse {
  export type AsObject = {
    schedule?: Schedule.AsObject,
  }
}

export class DeleteRequest extends jspb.Message {
  getId(): string;
  setId(value: string): DeleteRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRequest;
  static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
  export type AsObject = {
    id: string,
  }
}

export class DeleteResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteResponse): DeleteResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteResponse;
  static deserializeBinaryFromReader(message: DeleteResponse, reader: jspb.BinaryReader): DeleteResponse;
}

export namespace DeleteResponse {
  export type AsObject = {
  }
}

