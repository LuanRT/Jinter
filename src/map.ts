// This file was auto generated, do not edit.
// See ./scripts/build-nodes-json.js

import { default as ArrayExpression } from './nodes/ArrayExpression';
import { default as AssignmentExpression } from './nodes/AssignmentExpression';
import { default as BinaryExpression } from './nodes/BinaryExpression';
import { default as BlockStatement } from './nodes/BlockStatement';
import { default as BreakStatement } from './nodes/BreakStatement';
import { default as CallExpression } from './nodes/CallExpression';
import { default as ConditionalExpression } from './nodes/ConditionalExpression';
import { default as ContinueStatement } from './nodes/ContinueStatement';
import { default as ExpressionStatement } from './nodes/ExpressionStatement';
import { default as ForStatement } from './nodes/ForStatement';
import { default as FunctionDeclaration } from './nodes/FunctionDeclaration';
import { default as FunctionExpression } from './nodes/FunctionExpression';
import { default as Identifier } from './nodes/Identifier';
import { default as Literal } from './nodes/Literal';
import { default as LogicalExpression } from './nodes/LogicalExpression';
import { default as MemberExpression } from './nodes/MemberExpression';
import { default as NewExpression } from './nodes/NewExpression';
import { default as ObjectExpression } from './nodes/ObjectExpression';
import { default as ReturnStatement } from './nodes/ReturnStatement';
import { default as SequenceExpression } from './nodes/SequenceExpression';
import { default as SwitchCase } from './nodes/SwitchCase';
import { default as SwitchStatement } from './nodes/SwitchStatement';
import { default as ThisExpression } from './nodes/ThisExpression';
import { default as ThrowStatement } from './nodes/ThrowStatement';
import { default as TryStatement } from './nodes/TryStatement';
import { default as UnaryExpression } from './nodes/UnaryExpression';
import { default as UpdateExpression } from './nodes/UpdateExpression';
import { default as VariableDeclaration } from './nodes/VariableDeclaration';

const map: Record<string, any> = {
  ArrayExpression,
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  BreakStatement,
  CallExpression,
  ConditionalExpression,
  ContinueStatement,
  ExpressionStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  Literal,
  LogicalExpression,
  MemberExpression,
  NewExpression,
  ObjectExpression,
  ReturnStatement,
  SequenceExpression,
  SwitchCase,
  SwitchStatement,
  ThisExpression,
  ThrowStatement,
  TryStatement,
  UnaryExpression,
  UpdateExpression,
  VariableDeclaration
};

export default function getNode(name: string) {
  const NodeConstructor = map[name];

  if (!NodeConstructor) {
    const error = new Error(`Module not found: ${name}`);
    (error as any).code = 'MODULE_NOT_FOUND';
    throw error;
  }

  return NodeConstructor;
}
