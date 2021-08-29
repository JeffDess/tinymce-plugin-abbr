# TinyMCE `<abbr>` Plugin
This is a simple plugin for TinyMCE that allows to insert `<abbr>` tags from the editor tooolbar.

## What is `<abbr>`?

The `<abbr>` tag is a valid HTML5 element that allows to insert definitions of acronyms or abreviations. It is [one of the techniques](https://www.w3.org/TR/WCAG20-TECHS/H28.html) that can be used in order to conform with [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 3.1.4](https://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-located.html) (AAA).

## Features

* Insert <abbr> tag and content
* Select text and wrap it within an `<abbr>` tag
* Single click to autoselect existing `<abbr>` tags
* Edit existing `<abbr>` tags
* Remove existing `<abbr>` tags without deleting its content
* English and French localizations only

## Compatibility

* TinyMCE 4
* Umbraco 8
* Modern browsers

## Installation

1. Copy the _abbr/_ folder to _tinymce/plugins/_
1. Add the required configuration, depending on your installation type.

## Configuration 

### Javascript
```js
tinymce.init({
    ...
    plugins: 'abbr'
    extended_valid_elements : 'abbr[title|lang]'
});

```

### Umbraco 8
In Umbraco, you rather want to edit _tinyMceConfig.config_:

```xml
<tinymceConfig>
    <commands>
        ...
        <!-- Add the button in datatypes options -->
        <command alias="abbr" name="Abbreviation" mode="Selection" />
    </commands>
    <plugins>
        ...
        <!-- Import the plugin in the editor -->
        <plugin>abbr</plugin>
    </plugins>
    <validElements>
        <!-- abbr tags will be stripped if you don't add this to this list -->
        abbr[title|lang]
    </validElements>
    ...
</tinymceConfig>
``` 

You will then have to configure an RTE datatype and check the _Abbreviation_ option.