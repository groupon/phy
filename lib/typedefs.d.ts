import { Component, ComponentChildren, ComponentType, VNode } from 'preact';
import p from 'preact';

declare function isPreactNode(obj: object): boolean;

declare function phy(fragments: (string | ComponentType)[]): VNode;
declare function phy(
  selectorOrComp: string | ComponentType,
  ...kids: ComponentChildren[]
): VNode;
declare function phy(
  selectorOrComp: string | ComponentType,
  attrs: Readonly<Record<string, any>>,
  ...kids: ComponentChildren[]
): VNode;

declare namespace phy {
  let h: typeof phy;
  let Component: typeof p.Component;
  let render: typeof p.render;
  let isVNode: typeof isPreactNode;
}

export = phy;
