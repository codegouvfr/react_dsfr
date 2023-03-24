import React from "react";
import { Select, type SelectProps } from "../../src/Select";
import { assert, type Equals } from "tsafe/assert";

{
    const values = ["foo", "bar", "baz"] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            //@ts-expect-error
            "value": "not foo"
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            //@ts-expect-error
            "defaultValue": "not foo"
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select
        label="Label"
        nativeSelectProps={{
            "defaultValue": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"], Value>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"], Value>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select<SelectProps.Option<Value>[]>
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"], Value>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select<SelectProps.Option<Value>[]>
        label="Label"
        nativeSelectProps={{
            //@ts-expect-error
            "value": "not foo",
            "onChange": event => {
                assert<Equals<typeof event["target"], Value>>();
            }
        }}
        //@ts-expect-error
        options={values.map(value => ({
            "value": "not foo",
            "label": value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = [1, 2, 3] as const;

    <Select<SelectProps.Option<string>[]>
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"], string>>();
            }
        }}
        options={values.map(value => ({
            "value": `${value}`,
            "label": "" + value
        }))}
        placeholder="Selectionnez une option"
    />;
}

{
    const values = [1, 2, 3] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"], string>>();
            }
        }}
        options={values.map(value => ({
            "value": `${value}`,
            "label": "" + value
        }))}
        placeholder="Selectionnez une option"
    />;
}
