/**
 * @fileoverview gRPC-Web generated client stub for schedule
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as schedule_pb from './schedule_pb';


export class ScheduleServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoindex = new grpcWeb.AbstractClientBase.MethodInfo(
    schedule_pb.IndexResponse,
    (request: schedule_pb.IndexRequest) => {
      return request.serializeBinary();
    },
    schedule_pb.IndexResponse.deserializeBinary
  );

  index(
    request: schedule_pb.IndexRequest,
    metadata: grpcWeb.Metadata | null): Promise<schedule_pb.IndexResponse>;

  index(
    request: schedule_pb.IndexRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: schedule_pb.IndexResponse) => void): grpcWeb.ClientReadableStream<schedule_pb.IndexResponse>;

  index(
    request: schedule_pb.IndexRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: schedule_pb.IndexResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/schedule.ScheduleService/index',
        request,
        metadata || {},
        this.methodInfoindex,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/schedule.ScheduleService/index',
    request,
    metadata || {},
    this.methodInfoindex);
  }

  methodInfoshow = new grpcWeb.AbstractClientBase.MethodInfo(
    schedule_pb.ShowResponse,
    (request: schedule_pb.ShowRequest) => {
      return request.serializeBinary();
    },
    schedule_pb.ShowResponse.deserializeBinary
  );

  show(
    request: schedule_pb.ShowRequest,
    metadata: grpcWeb.Metadata | null): Promise<schedule_pb.ShowResponse>;

  show(
    request: schedule_pb.ShowRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: schedule_pb.ShowResponse) => void): grpcWeb.ClientReadableStream<schedule_pb.ShowResponse>;

  show(
    request: schedule_pb.ShowRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: schedule_pb.ShowResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/schedule.ScheduleService/show',
        request,
        metadata || {},
        this.methodInfoshow,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/schedule.ScheduleService/show',
    request,
    metadata || {},
    this.methodInfoshow);
  }

  methodInfocreate = new grpcWeb.AbstractClientBase.MethodInfo(
    schedule_pb.CreateResponse,
    (request: schedule_pb.CreateRequest) => {
      return request.serializeBinary();
    },
    schedule_pb.CreateResponse.deserializeBinary
  );

  create(
    request: schedule_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null): Promise<schedule_pb.CreateResponse>;

  create(
    request: schedule_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: schedule_pb.CreateResponse) => void): grpcWeb.ClientReadableStream<schedule_pb.CreateResponse>;

  create(
    request: schedule_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: schedule_pb.CreateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/schedule.ScheduleService/create',
        request,
        metadata || {},
        this.methodInfocreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/schedule.ScheduleService/create',
    request,
    metadata || {},
    this.methodInfocreate);
  }

  methodInfoupdate = new grpcWeb.AbstractClientBase.MethodInfo(
    schedule_pb.UpdateResponse,
    (request: schedule_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    schedule_pb.UpdateResponse.deserializeBinary
  );

  update(
    request: schedule_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<schedule_pb.UpdateResponse>;

  update(
    request: schedule_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: schedule_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<schedule_pb.UpdateResponse>;

  update(
    request: schedule_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: schedule_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/schedule.ScheduleService/update',
        request,
        metadata || {},
        this.methodInfoupdate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/schedule.ScheduleService/update',
    request,
    metadata || {},
    this.methodInfoupdate);
  }

  methodInfodelete = new grpcWeb.AbstractClientBase.MethodInfo(
    schedule_pb.DeleteResponse,
    (request: schedule_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    schedule_pb.DeleteResponse.deserializeBinary
  );

  delete(
    request: schedule_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<schedule_pb.DeleteResponse>;

  delete(
    request: schedule_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: schedule_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<schedule_pb.DeleteResponse>;

  delete(
    request: schedule_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: schedule_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/schedule.ScheduleService/delete',
        request,
        metadata || {},
        this.methodInfodelete,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/schedule.ScheduleService/delete',
    request,
    metadata || {},
    this.methodInfodelete);
  }

}

