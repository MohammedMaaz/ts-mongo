import { Document } from 'mongodb'
import { Pipeline } from './aggregation'

/**
 * https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/unionWith/
 */
export declare type TsUnionWith<
  TSchema extends Document,
  TSchemaOther extends Document
> = {
  coll: string
  pipeline?: Exclude<
    Pipeline<TSchema, TSchemaOther>,
    // $out and $merge stages are not allowed in $unionWith
    { $out: unknown } | { $merge: unknown }
  >[]
}