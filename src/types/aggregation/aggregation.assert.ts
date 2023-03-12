import { ResumeToken } from 'mongodb'
import * as ta from 'type-assertions'
import { Pipeline } from './aggregation'

type ExampleTSchema = {
  a: number[]
  b: string
  c: number
}

type ExampleTSchemaLookup = {
  x: number
}

type ExampleTSchemaUnionWith = {
  a: number[]
  b: string
}

// Test Pipeline $match
ta.assert<
  ta.Extends<
    { $match: { a: [1, 2] } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      { $match: { a: '' } },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      { $match: { x: [1, 2] } },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()

// Test Pipeline $project
ta.assert<
  ta.Extends<
    { $project: { a: 1 } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()
ta.assert<
  ta.Extends<
    { $project: { b: 1 } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      { $project: { a: '1' } },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      { $project: { x: 1 } },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()

// Test Pipeline $sort
ta.assert<
  ta.Extends<
    { $sort: { c: -1 } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()
ta.assert<
  ta.Extends<
    { $sort: { b: -1 } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()

// Test Pipeline $lookup
ta.assert<
  ta.Extends<
    { $lookup: { from: ''; localField: 'a'; foreignField: 'x'; as: '' } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      { $lookup: { from: ''; localField: 'a'; foreignField: 'd'; as: '' } },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()

// Test Pipeline $changeStream
ta.assert<
  ta.Extends<
    { $changeStream: { fullDocument: 'updateLookup' } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup>
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      {
        $changeStream: {
          resumeAfter: ResumeToken
          startAfter: ResumeToken
        }
      },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      { $changeStream: { startAtOperationTime: number } },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup>
    >
  >
>()

// Test Pipeline $unionWith
ta.assert<
  ta.Extends<
    { $unionWith: { coll: string; pipeline: [{ $match: { a: [1, 2] } }] } },
    Pipeline<ExampleTSchema, ExampleTSchemaLookup, ExampleTSchemaUnionWith>
  >
>()
ta.assert<
  ta.Not<
    ta.Extends<
      {
        $unionWith: {
          coll: string
          pipeline: [{ $match: { a: [1, 2] } }, { $merge: { into: string } }]
        }
      },
      Pipeline<ExampleTSchema, ExampleTSchemaLookup, ExampleTSchemaUnionWith>
    >
  >
>()
