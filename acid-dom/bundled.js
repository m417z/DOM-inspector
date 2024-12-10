/**
 * AcID Dom Inspector 1.0.1
 *
 * @file        acid_dom.js
 * @author      Jan Myler <info@janmyler.com>
 * @copyright   Copyright 2013, Jan Myler (http://janmyler.com)
 * @license     MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 */

(function(window, document, undefined) {
	'use strict';

    if (window.acidDomInspectorBundledLoaded) {
        return;
    }

    window.acidDomInspectorBundledLoaded = true;

    const cssStyle = `
body {
    -webkit-animation: bugfix infinite 1s
}

@-webkit-keyframes bugfix {
    from {
        padding: 0
    }

    to {
        padding: 0
    }
}

#adi-wrapper {
    position: fixed;
    height: 100%;
    top: 0;
    background: #fafafa;
    font-family: "Segoe UI", Arial;
    font-size: 12px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

#adi-wrapper.left {
    left: 0
}

#adi-wrapper.right {
    right: 0
}

#adi-wrapper.transparent {
    background: rgba(250, 250, 250, 0.8)
}

#adi-panel {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 24px;
    background: #d4d4d4;
    border-top: 1px solid #bbc5c9
}

#adi-panel .adi-path-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80%;
    height: 24px;
    padding: 0 13px 0 18px;
    line-height: 24px;
    overflow: hidden;
    box-sizing: border-box;
    -moz-box-sizing: border-box
}

#adi-panel .adi-path-wrap.adi-overflowing .adi-path-left,
#adi-panel .adi-path-wrap.adi-overflowing .adi-path-right {
    display: block
}

#adi-panel .adi-path {
    height: 24px;
    overflow: hidden;
    white-space: nowrap
}

#adi-panel .adi-path-left,
#adi-panel .adi-path-right {
    display: none;
    position: absolute;
    top: 0;
    width: 8px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: .7
}

#adi-panel .adi-path-left:hover,
#adi-panel .adi-path-right:hover {
    opacity: 1
}

#adi-panel .adi-path-left {
    left: 7px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUVGMDQ3OTdBMDlEMTFFMjgxM0VBNkE4RDAyODRGMzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUVGMDQ3OThBMDlEMTFFMjgxM0VBNkE4RDAyODRGMzgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRUYwNDc5NUEwOUQxMUUyODEzRUE2QThEMDI4NEYzOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRUYwNDc5NkEwOUQxMUUyODEzRUE2QThEMDI4NEYzOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqyG9ZIAAABYSURBVHjaYmDADlKBuArEYMEiGQjEs6BsVnRJXyD+j4RvI0u6AfE/JMnrQCwGk3QA4l9oOiVgkt5oxp4FYm6YJBMDkQCvFUQ5kihvIgcUTEE9A6GgBggwAGAtIqG4bpDDAAAAAElFTkSuQmCC')
}

#adi-panel .adi-path-right {
    right: 2px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJDOUMyQ0JBMDlEMTFFMjg1QUVBREMzMEQ1OTlDNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJDOUMyQ0NBMDlEMTFFMjg1QUVBREMzMEQ1OTlDNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMkM5QzJDOUEwOUQxMUUyODVBRUFEQzMwRDU5OUM2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMkM5QzJDQUEwOUQxMUUyODVBRUFEQzMwRDU5OUM2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrZMwfgAAABSSURBVHjaYmZgYGAH4gYgVgPiswxYQD8Q/wfiv0Cch03BUqgCGC7HpmgmmqJ2bIpa0RRNB2JedEXr0BSlEG0CXjcQ9AXBcACFZDMQp2OTBAgwANpjJSgtIqvkAAAAAElFTkSuQmCC')
}

#adi-panel .adi-menu-wrap {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 24px
}

#adi-panel .adi-menu-lookup,
#adi-panel .adi-menu-config {
    display: block;
    float: left;
    width: 24px;
    height: 24px;
    border-left: 1px solid #bbc5c9;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: .7;
    border-radius: 0
}

#adi-panel .adi-menu-lookup:hover,
#adi-panel .adi-menu-config:hover {
    background-color: #c5d9d8;
    opacity: 1
}

#adi-panel .adi-menu-lookup.adi-active,
#adi-panel .adi-menu-config.adi-active {
    background-color: #fafafa;
    opacity: 1
}

#adi-panel .adi-menu-lookup {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjUwMDI1QUFBMDlEMTFFMjgwQkJFRDM0NDdBNkVERTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjUwMDI1QUJBMDlEMTFFMjgwQkJFRDM0NDdBNkVERTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NTAwMjVBOEEwOUQxMUUyODBCQkVEMzQ0N0E2RURFMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NTAwMjVBOUEwOUQxMUUyODBCQkVEMzQ0N0E2RURFMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpXe2XkAAADbSURBVHjaYmBAACEgrgfic0D8AogfAPFsIDZnwAM0oQr/Q/EfJDYIF2HTxAfET6AKdgCxPRCLArEOELciafZF11gLldgHxExYDM6Ayt8GYk5kictQCVM8XrkCVWMGE2CCOgsEbuHReAEpAOEaf0DZgng0SkHp38iCS6HOaMWhSQuq4SmS68DAACnkctA0geRuQOVmYzM1H0kzKCA2APFOtLh8B8Qx2DQHA/F5NMWgFDQXiP8iiWHVzAzExkDsDk0IAlDxCDQDMxhIANFIGq8ykAjSgXg/EKsDBBgAPPFCY4Pj7noAAAAASUVORK5CYII=')
}

#adi-panel .adi-menu-config {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzJEMDJFNzBBMDlEMTFFMjgxRjlGQkM1MzZBMEYzRjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJEMDJFNzFBMDlEMTFFMjgxRjlGQkM1MzZBMEYzRjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MkQwMkU2RUEwOUQxMUUyODFGOUZCQzUzNkEwRjNGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MkQwMkU2RkEwOUQxMUUyODFGOUZCQzUzNkEwRjNGMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjtr1QgAAADjSURBVHjaYmDADiSA+D0QvwZiQWwKmJDYRUDsBWWHA7EAEIsAcTBULACI49ANKADi/1C8F4j/IPF/AvEBJH4QskY/IP6EJIkLg5xvh27rETRFa6AYWWwnsgZlIM4E4m9ITnNDkvcG4t9Qua9AnArVA9cAw+uwBOJGNDXfmKCmEQJsaHywHgVoMH9CcqovkiJQ1PyFyoHUREP1wMExLE7eiia2A90poLj5RUR0fIIFHCzlcAAxK5S9BYh/IBkKCrxNUDYvEPOh2wryixWUnYVkSwJUzBmIIwiFoiRSIhfCpgAgwAAJOFioPc/OTgAAAABJRU5ErkJggg==')
}

#adi-dom-view {
    height: 50%
}

#adi-dom-view ul {
    margin: 0;
    padding: 0;
    list-style: none
}

#adi-dom-view ul[data-open=true] {
    display: block
}

#adi-dom-view ul[data-open=false] {
    display: none
}

#adi-dom-view ul ul {
    margin: 4px 0
}

#adi-dom-view ul li {
    margin: 4px 0;
    padding-left: 15px
}

#adi-dom-view .adi-normal-node,
#adi-dom-view .adi-end-node {
    margin-right: 5px;
    padding: 0 6px 0px;
    background: #d2e8ff;
    border-radius: 8px;
    cursor: default
}

#adi-dom-view .adi-normal-node:hover,
#adi-dom-view .adi-normal-node.hover,
#adi-dom-view .adi-end-node:hover,
#adi-dom-view .adi-end-node.hover {
    background: #ffcc62
}

#adi-dom-view .adi-normal-node:hover~span,
#adi-dom-view .adi-normal-node.hover~span,
#adi-dom-view .adi-end-node:hover~span,
#adi-dom-view .adi-end-node.hover~span {
    background: #ffcc62
}

#adi-dom-view .adi-normal-node.adi-active-node,
#adi-dom-view .adi-end-node.adi-active-node {
    background: #ff7e7e
}

#adi-dom-view .adi-normal-node.adi-active-node~span,
#adi-dom-view .adi-end-node.adi-active-node~span {
    background: #ff7e7e
}

#adi-dom-view .adi-text-node,
#adi-dom-view .adi-comment-node {
    display: block;
    padding: 3px 8px;
    color: #444;
    background: #fff;
    border-radius: 8px
}

#adi-dom-view .adi-text-node:after,
#adi-dom-view .adi-comment-node:after {
    content: '"'
}

#adi-dom-view .adi-text-node:before,
#adi-dom-view .adi-comment-node:before {
    content: '"'
}

#adi-dom-view .adi-comment-node {
    color: #999;
    font-style: italic
}

#adi-dom-view .adi-trigger {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px 0 -13px;
    opacity: .7
}

#adi-dom-view .adi-trigger.closed {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKCAYAAABmBXS+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDk0M0ExRjRBMDlEMTFFMkIzOThCNDREODRGODY0RUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0M0ExRjVBMDlEMTFFMkIzOThCNDREODRGODY0RUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTQzQTFGMkEwOUQxMUUyQjM5OEI0NEQ4NEY4NjRFQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTQzQTFGM0EwOUQxMUUyQjM5OEI0NEQ4NEY4NjRFQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvAwK0oAAACNSURBVHjaYmZgYKgDYjkgfg7E3xhwgPtA/AmIZwCxNRBzYlN0B4j/A/FXIL4AxJOB2AmIOWAKmIE4EYglgJgVSusBsSEQK0DVfAARl6AmoeO/ULkKJgYiAAtUBzL4AcRXgXgvEO8B4rMgRbxQSZD3bwPxISBeB8THgfgn0UEAMmk+VOEOIH6NzU0AAQYAZJUjvTKI9t0AAAAASUVORK5CYII=') no-repeat
}

#adi-dom-view .adi-trigger.opened {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjlERkU1ODFBMDlEMTFFMjg4NTg5MkZDNEM3RjAxQTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjlERkU1ODJBMDlEMTFFMjg4NTg5MkZDNEM3RjAxQTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOURGRTU3RkEwOUQxMUUyODg1ODkyRkM0QzdGMDFBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOURGRTU4MEEwOUQxMUUyODg1ODkyRkM0QzdGMDFBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvYriLgAAABhSURBVHjaYmRgYJgAxKlA/JsBO2AF4tkghjEQ/yeAjWG65uJRNBfZeBkg/oVF0S+oHAqYjEXhFGyOFgLij0iKPgGxKA4PMtQjKaxnwAMEkRQKIkuwoCl8D8TTkNhwABBgAConKQuCpl2JAAAAAElFTkSuQmCC') no-repeat
}

#adi-dom-view .adi-trigger:hover {
    opacity: 1
}

#adi-opts-view {
    position: relative;
    height: 100%;
    padding: 0 15px;
    background: #fff
}

#adi-opts-view.adi-hidden {
    display: none
}

#adi-opts-view .adi-opt-heading,
#adi-opts-view .adi-opt {
    display: block;
    padding: 5px 0
}

#adi-opts-view .adi-opt-heading {
    padding: 20px 0 10px;
    font-size: 15px
}

#adi-opts-view .adi-opt-heading:first-child {
    padding-top: 10px
}

#adi-opts-view .adi-opt input {
    margin-right: 6px
}

#adi-opts-view .adi-opt-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 16px;
    height: 16px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjEyMUU3NjlBM0NBMTFFMjkxRDNCQjE4NzlCQTFBNDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjEyMUU3NkFBM0NBMTFFMjkxRDNCQjE4NzlCQTFBNDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMTIxRTc2N0EzQ0ExMUUyOTFEM0JCMTg3OUJBMUE0MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMTIxRTc2OEEzQ0ExMUUyOTFEM0JCMTg3OUJBMUE0MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PldzNYYAAADKSURBVHjaYmHADuyA2BSIRaD8N0B8GogPMRAAJkB8GIj/48CHoWqwgjgg/oakeA8Q90PxHiTxb1C1KMAAScENINbEYoEmVA6mzgBZ8ixU8AJSGKQhyadBxRigav5D9YCBFVTgHxArQwMPZksCFMP4plA1/6B8kF6GCihnL9TAZDyBmAxVsxfKL2cCEoJQwUtQei4QJ2IJg0SoHLJaUSYGygA7yID3UI4ekhfmY1E8H8kLMLWPqRKIFEcjVRISxUmZ7MzESGl2BggwAIKuaOZJ+rLsAAAAAElFTkSuQmCC') no-repeat;
    opacity: .7
}

#adi-opts-view .adi-opt-close:hover {
    opacity: 1
}

#adi-attr-view {
    height: 50%
}

#adi-attr-view .adi-attr {
    display: block;
    padding: 5px 0
}

#adi-attr-view hr {
    height: 1px;
    border: none
}

#adi-attr-view input[type=text] {
    width: 100%;
    margin-top: 3px;
    padding: 2px
}

#adi-horiz-split {
    height: 4px;
    cursor: n-resize;
    border-width: 0 0 1px 0;
    background: #bbc5c9;
    border-color: #768285;
    border-style: solid;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

#adi-horiz-split:hover {
    background: #c5d9d8
}

#adi-vert-split {
    position: fixed;
    top: 0;
    width: 4px;
    height: 100%;
    cursor: e-resize;
    border-width: 0 1px 0 0;
    background: #bbc5c9;
    border-color: #768285;
    border-style: solid;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

#adi-vert-split:hover {
    background: #c5d9d8
}

.adi-content {
    position: relative;
    padding: 10px 15px;
    overflow: auto;
    box-sizing: border-box;
    -moz-box-sizing: border-box
}
    `;

    const cssStyleElement = document.createElement("style");
    cssStyleElement.id = 'acid-dom-inspector-bundled-style';
    cssStyleElement.textContent = cssStyle;
    document.head.appendChild(cssStyleElement);

	var delegatedEvents = [];

	// Console compatibility shim.
	function consoleShim() {
		// missing console workaround
		if (typeof window.console === 'undefined') {
			var console = {};
			console.log = console.error = console.warn = console.dir = function() {};
		}
	}

	// Node types shim -- creates Node type constants if necessary
	function nodeTypesShim() {
		if (!window.Node) {
			return {
				ELEMENT_NODE                :  1,
				ATTRIBUTE_NODE              :  2,
				TEXT_NODE                   :  3,
				CDATA_SECTION_NODE          :  4,
				ENTITY_REFERENCE_NODE       :  5,
				ENTITY_NODE                 :  6,
				PROCESSING_INSTRUCTION_NODE :  7,
				COMMENT_NODE                :  8,
				DOCUMENT_NODE               :  9,
				DOCUMENT_TYPE_NODE          : 10,
				DOCUMENT_FRAGMENT_NODE      : 11,
				NOTATION_NODE               : 12
			};
		}
	}

	// Simple cross-browser event handler.
	function addEvent(elem, evt, fn, capture) {
		if (typeof elem !== 'object') {
			throw "addEvent: Expected argument elem of type object, " + typeof elem + " given.";
		}

		if (window.addEventListener) {
			if (!capture) {
				capture = false;
			}

			elem.addEventListener(evt, fn, capture);
		} else {
			elem.attachEvent('on' + evt, fn);
		}
	}

	// Simple cross-browser event handler that enables simple event delegation.
	// Note that the selector must be a string and no nesting is supported.
	// Selector is expected to be in one of formats listed below and works for all children
	// in the particular element.
	// Store parameter enables storing the reference to custom event handler.
	// Exclude parameter will exclude the particular element and all of its children, this works
	// only for id selectors.
	// Selector formats: tag name ("div"), class name (".my-class"), id ("#my-id") and any ("*").
	function addEventDelegate(elem, evt, fn, capture, selector, store, exclude) {
		// custom event handler is registered
		var handler = function(e) {
			// check if target corresponds to the selector
			var target = e ? e.target : window.event.srcElement,
				sel = selector.substr(1),
				delegate = false;

			if (exclude) {
				var node = target;

				while (node !== document) {
					if (node.id === exclude) {
						return;
					}

					node = node.parentNode;
				}
			}

			// should the event be delegated?
			if (selector.indexOf('#') === 0) {	// ID
				delegate = target.id === sel;
			} else if (selector.indexOf('.') === 0) { // class
				delegate = target.className.indexOf(sel) !== -1;
			} else if (selector === '*') { // any
				delegate = true;
			} else { // tag name
				delegate = target.nodeName.toLowerCase() === selector;
			}

			// delegate the event handling
			if (delegate) {
				fn.call(this, e);
			}
		};
		// save the reference
		if (store) {
			delegatedEvents.push({
				'handle' : handler,
				'elem' : elem,
				'fn' : fn,
				'evt': evt
			});
		}

		// add custom event
		addEvent(elem, evt, handler, capture);
	}

	// Simple cross-browser event removing
	function removeEvent(elem, evt, fn, wasDelegated) {
		if (typeof elem !== 'object') {
			throw "addEvent: Expected argument elem of type object, " + typeof elem + " given.";
		}

		// try to find stored delegated event
		var stored = null;
		if (wasDelegated) {
			for (var i = 0, len = delegatedEvents.length; i < len; ++i) {
				stored = delegatedEvents[i];
				if (stored.elem === elem && stored.evt === evt && stored.fn === fn) {
					fn = stored.handle;
					delegatedEvents.splice(i, 1);
					break;
				}
			}
		}

		if (window.addEventListener) {
			elem.removeEventListener(evt, fn, false);
		} else {
			elem.dettachEvent('on' + evt, fn);
		}
	}

	// Stops event propagation and also prevents the default behavior.
	function pauseEvent(e){
		if(e.stopPropagation) {
			e.stopPropagation();
		}

		if(e.preventDefault) {
			e.preventDefault();
		}

		e.cancelBubble = true;
		e.returnValue = false;

		return false;
	}

	// Create element wrapper -- allows to set attributes using the config object.
	function newElement(elem, attrs) {
		var el = document.createElement(elem);

		attrs = attrs || {};
		for (var attr in attrs) {
			// work only with direct (non-inherited) properties
			if (attrs.hasOwnProperty(attr)) {
				el.setAttribute(attr, attrs[attr]);
			}
		}

		return el;
	}

	// Function adds a class to the element, only if the class does not already exist.
	// Cls parameter may be either a string or an array listing multiple classes.
	// Implementation uses modern element.classList API if available, dummy shim provided for older
	// browsers.
	function addClass(elem, cls) {
		if (typeof elem !== 'object') {
			throw "addClass: Expected argument elem of type object, " + typeof elem + " given.";
		}

		// normalize to array
		if (typeof cls === 'string') {
			cls = [cls];
		}

		// iterate over classes and add new if necessary
		for (var i = 0, len = cls.length; i < len; ++i) {
			if (supported('classList')) {
				elem.classList.add(cls[i]);
			} else {
				// prevents the match when new class is only a substring of another class name
				if (!new RegExp('(?:^|\\s)' + cls[i] + '(?:\\s|$)').test(elem.className)) {
					elem.className += ' ' + cls[i];
				}
			}
		}
	}

	// Function removes a class from the element, only if the class exists.
	// Cls parameter may be either a string or an array listing multiple classes.
	// Implementation uses modern element.classList API if available, dummy shim provided for older
	// browsers.
	function removeClass(elem, cls) {
		if (typeof elem !== 'object') {
			throw "removeClass: Expected argument elem of type object, " + typeof elem + " given.";
		}

		// normalize to array
		if (typeof cls === 'string') {
			cls = [cls];
		}

		// iterate over classes and remove if necessary
		for (var i = 0, len = cls.length; i < len; ++i) {
			if (supported('classList')) {
				elem.classList.remove(cls[i]);
			} else {
				// removes the class if it exists
				var newClassName = elem.className.replace(new RegExp('(?:^|\\s)' + cls[i] + '(?:\\s|$)', 'g'), ' ');
				elem.className = newClassName.replace(/^\s+|\s+$/g, '');
			}
		}
	}

	// Functions checks whether the feature is supported.
	function supported(key) {
		switch (key) {
			case 'localStorage':
				try {
					return 'localStorage' in window && !!window.localStorage;
				} catch (e) {
					return false;
				}

				break;
			case 'classList':
				return 'classList' in document.createElement('a');

			default:
				throw "supported: Unknown or unsupported key.";
		}
	}


	// AcID DOM Inspector definition (using module pattern).
	var ADI = (function() {
		// private methods and variables
		var Node = window.Node || nodeTypesShim(),
			uiView = null,
			menuView = null,
			domView = null,
			attrView = null,
			pathView = null,
			optsView = null,
			activeElement = null,
			vertResizing = false,
			horizResizing = false,
			pathScrolling = null,
			elemLookup = false,
			styleBackup = '',
			xPos = 0,
			options = {
				align: 'right',  // NOTE: left is not supported in this version
				width: 340,
				minWidth: 260,
				split: 50,
				minSplit: 30,
				visible: true,
				saving: false,
				transparent: true,
				omitEmptyText: true,
				makeVisible: true,
				foldText: true,
				nodeTypes: [1, 3, 8, 9]
			};

		// Returns selected element or null
		function getSelected() {
			if (!activeElement) {
				return null;
			}

			var elem = document,
				path = JSON.parse(activeElement.getAttribute('data-js-path'));

			if (path[0] !== "") {
				for (var i = 0, len = path.length; i < len; ++i) {
					elem = elem.childNodes[path[i]];
				}
			}

			return elem;
		}

		// Loads user defined options stored in HTML5 storage (if available)
		function loadOptions() {
			var userOptions = {};

			if (supported('localStorage')) {
				userOptions = JSON.parse(localStorage.getItem('ADI.options')) || {};
			}

			// merge with defaults
			for (var opt in userOptions) {
				options[opt] = userOptions[opt];
			}
		}

		// Saves user defined options into the HTML5 storage (if available)
		function saveOptions() {
			if (supported('localStorage') && options.saving) {
				localStorage.setItem('ADI.options', JSON.stringify(options));
			}
		}

		// Resets user defined options and removes them from the HTML5 storage
		function resetOptions() {
			if (supported('localStorage')) {
				localStorage.removeItem('ADI.options');
			}
		}

		// Returns CSS and JS paths to the element
		// Result is an object with two variables (cssPath, jsPath) where cssPath is a string
		// which holds the css path starting from the HTML element, and jsPath is an array which
		// contains indexes for childNodes arrays (starting at document object).
		//
		// Inspired by the selector function from Rochester Oliveira's jQuery plugin
		// http://rockingcode.com/tutorial/element-dom-tree-jquery-plugin-firebug-like-functionality/
		function getElemPaths(elem) {
			if (typeof elem !== 'object') {
				throw "getElemPaths: Expected argument elem of type object, " + typeof elem + " given.";
			}

			var css = "",
				js = "",
				parent = "",
				i, len;

			while (elem !== document) {
				parent = elem.parentNode;

				// javascript selector
				for (i = 0, len = parent.childNodes.length; i < len; ++i) {
					if (parent.childNodes[i] === elem) {
						js = i + "," + js;
						break;
					}
				}

				// CSS selector
				var cssTmp = elem.nodeName;

				if (elem.id) {
					cssTmp += '#' + elem.id;
				}

				if (elem.className) {
					// use classList if available
					var classList = elem.classList || elem.className.split(' ');

					for (i = 0, len = classList.length; i < len; ++i) {
						cssTmp += '.' + classList[i];
					}
				}

				css = cssTmp + ' ' + css;
				elem = elem.parentNode;
			}

			js = js.slice(0, -1).split(',');

			return {
				cssPath: css.toLowerCase(),
				jsPath: js
			};
		}

		// Checks if a node has some child nodes and if at least on of them is of a supported type
		function hasRequiredNodes(node) {
			if (typeof node !== 'object') {
				throw "hasRequiredNodes: Expected argument node of type object, " + typeof node + " given.";
			}

			if (node.hasChildNodes()) {
				for (var i = 0, len = node.childNodes.length; i < len; i++) {
					if (options.nodeTypes.indexOf(node.childNodes[i].nodeType) !== -1) {
						return true;
					}
				}
			}

			return false;
		}

		// Checks whether the text node is not empty or contains only the EOL
		function isEmptyTextNode(node) {
			if (typeof node !== 'object') {
				throw "isEmptyTextNode: Expected argument node of type object, " + typeof node + " given.";
			}

			return (/^\s*$/).test(node.textContent);
		}

		// Checks whether the node or its children contains only text information
		function containsOnlyText(node, checkChildren) {
			if (typeof node !== 'object') {
				throw "containsOnlyText: Expected argument node of type object, " + typeof node + " given.";
			}

			checkChildren = checkChildren || false;

			var result = false,
				nodeTmp = null;

			// does the node contain only text nodes?
			if (checkChildren) {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					nodeTmp = node.childNodes[i];
					result = nodeTmp.nodeType === Node.TEXT_NODE
							|| nodeTmp.nodeType === Node.COMMENT_NODE
							|| nodeTmp.nodeType === Node.CDATA_SECTION_NODE;

					if (!result) {
						break;
					}
				}
			} else {
				// check the node type if it doesn't have any children
				result = node.nodeType === Node.TEXT_NODE
						|| node.nodeType === Node.COMMENT_NODE
						|| node.nodeType === Node.CDATA_SECTION_NODE;
			}

			return result;
		}

		// Creates a starting markup for a new DOM tree view node
		function newTreeNode(node) {
			if (typeof node !== 'object') {
				throw "newTreeNode: Expected argument node of type object, " + typeof node + " given.";
			}

			var withChildren = hasRequiredNodes(node),
				omit = false,
				elem = newElement('li', {
					class: (withChildren ? 'adi-node' : '')
				});

			// do not show ADI DOM nodes in the DOM view
			if (node === uiView) {
				return null;
			}

			// generate UI for elements with children
			if (withChildren) {
				elem.appendChild(newElement('span', { class: 'adi-trigger' }));
			}

			// we can omit empty text nodes if allowed in options
			if (options.omitEmptyText && node.nodeType === Node.TEXT_NODE) {
				omit = isEmptyTextNode(node);
			}

			if (!omit) {
				var path = getElemPaths(node),
					tagStart = newElement('span', {
						'data-css-path' : path.cssPath,
						'data-js-path'  : JSON.stringify(path.jsPath)
					}),
					tagEnd = null;

				if (containsOnlyText(node)) {

					if (node.nodeType === Node.COMMENT_NODE) {
						addClass(tagStart, 'adi-comment-node');
						if (typeof tagStart.innerText === 'string') {
							tagStart.innerText = '<!-- ' + node.textContent + ' -->';
						} else {
							tagStart.textContent = '<!-- ' + node.textContent + ' -->';
						}
					} else {
						addClass(tagStart, 'adi-text-node');
						tagStart.textContent = node.textContent;
					}
				} else {
					addClass(tagStart, 'adi-normal-node');
					if (node.nodeType !== Node.DOCUMENT_NODE) {
						tagStart.textContent = '<' + node.nodeName.toLowerCase() + '>';

						if (withChildren) {
							tagEnd = newElement('span');
							addClass(tagEnd, 'adi-end-node');
							tagEnd.textContent = '</' + node.nodeName.toLowerCase() + '>';
						}
					} else {
						tagStart.textContent = node.nodeName.toLowerCase();
					}
				}

				elem.appendChild(tagStart);
				if (tagEnd) {
					elem.appendChild(tagEnd);
				}

				return elem;
			} else {
				return null;
			}
		}

		// Renders the DOM Tree view
		function drawDOM(root, elem, isRoot) {
			if (typeof root !== 'object') {
				throw "drawDOM: Expected argument root of type object, " + typeof root + " given.";
			}

			var newNode = null,
				isOpen = true;

			if (isRoot && options.nodeTypes.indexOf(root.nodeType) !== -1) {
				elem.innerHTML = '';
				newNode = newTreeNode(root);

				if (hasRequiredNodes(root)) {
					newNode.appendChild(newElement('ul', { 'data-open' : true }));
					addClass(newNode.querySelector('.adi-trigger'), 'opened');
				}

				elem.appendChild(newNode);
				elem = elem.querySelector('ul');
			}

			// recursive DOM traversal
			for (var i = 0, len = root.childNodes.length; i < len; ++i) {
				var node = root.childNodes[i],
					withChildren = hasRequiredNodes(node);

				if (options.nodeTypes.indexOf(node.nodeType) !== -1) {
					newNode = newTreeNode(node);

					if (newNode) {
						if (withChildren) {
							if (options.foldText) {
								isOpen = containsOnlyText(node, true) ? false : true;
							} else {
								isOpen = true;
							}

							if (node.nodeType === Node.DOCUMENT_NODE) {
								newNode.appendChild(newElement('ul', { 'data-open' : isOpen }));
							} else {
								newNode.insertBefore(newElement('ul', { 'data-open' : isOpen }), newNode.lastChild);
							}

							addClass(newNode.querySelector('.adi-trigger'), isOpen ? 'opened' : 'closed');
						}

						elem.appendChild(newNode);

						if (withChildren) {
							drawDOM(node, newNode.querySelector('ul'), false);
						}
					}
				}
			}
		}

		// Show/hide the options view
		function toggleOptions() {
			if (optsView.className.indexOf('adi-hidden') !== -1) {
				removeClass(optsView, 'adi-hidden');
			} else {
				addClass(optsView, 'adi-hidden');
				pathView.textContent = '';
				attrView.querySelector('.adi-content').innerHTML = '';
				refreshUI();
				drawDOM(document, domView.querySelector('.adi-tree-view'), true);
				if (options.saving) {
					saveOptions();
				} else {
					resetOptions();
				}
			}
		}

		// Helper function for options view
		function drawOptionRow(optionCode, optionText) {
			var row = newElement('span', { class: 'adi-opt' });
			row.innerHTML = '<label><input type="checkbox" data-opt="' + optionCode + '">' + optionText + '</label>';

			return row;
		}

		// Renders the options panel
		function drawOptions() {
			var ui = newElement('div', { id: 'adi-opts-view', class: 'adi-hidden' }),
				head1 = newElement('span', { class: 'adi-opt-heading' }),
				head2 = newElement('span', { class: 'adi-opt-heading' }),
				close = newElement('span', { class: 'adi-opt-close' });

			head1.textContent = 'General options';
			head2.textContent = 'Observed nodes';

			ui.appendChild(head1);
			ui.appendChild(drawOptionRow('saving', 'Enable saving of settings'));
			ui.appendChild(drawOptionRow('makeVisible', 'Scroll to the active element in DOM View'));
			ui.appendChild(drawOptionRow('omitEmptyText', 'Hide empty text nodes'));
			ui.appendChild(drawOptionRow('foldText', 'Fold the text nodes'));
			ui.appendChild(drawOptionRow('transparent', 'Enable transparent background'));
			ui.appendChild(head2);
			ui.appendChild(drawOptionRow('nodeTypes-3', 'Text node'));
			ui.appendChild(drawOptionRow('nodeTypes-8', 'Comment node'));
			// ui.appendChild(drawOptionRow('nodeTypes-1', 'Element node'));
			// ui.appendChild(drawOptionRow('nodeTypes-9', 'Document node'));
			ui.appendChild(close);

			return ui;
		}

		// Renders the UI
		function drawUI() {
			var wrapper = newElement('div', {
					id: 'adi-wrapper',
					class: options.transparent ? 'transparent' : ''
				}),
				domViewWrap = newElement('div', { id: 'adi-dom-view' }),
				domViewContent = newElement('div', { class: 'adi-content' }),
				attrViewWrap = newElement('div', { id: 'adi-attr-view' }),
				attrViewContent = newElement('div', { class: 'adi-content' }),
				horizSplit = newElement('div', { id: 'adi-horiz-split' }),
				vertSplit = newElement('div', {	id: 'adi-vert-split' }),
				domTree = newElement('ul', { class: 'adi-tree-view'	}),
				domPathWrap = newElement('div', { class: 'adi-path-wrap' }),
				domPath = newElement('div', { class: 'adi-path'	}),
				domPathScrollLeft = newElement('span', { class: 'adi-path-left'	}),
				domPathScrollRight = newElement('span', { class: 'adi-path-right' }),
				naviWrap = newElement('div', { id: 'adi-panel' }),
				naviButtons = newElement('div', { class: 'adi-menu-wrap' }),
				naviConfig = newElement('a', { class: 'adi-menu-config', title: 'Settings' }),
				naviLookup = newElement('a', { class: 'adi-menu-lookup', title: 'Lookup tool' }),
				optionsView = drawOptions();


			// put UI together
			domViewContent.appendChild(domTree);
			domViewWrap.appendChild(domViewContent);
			attrViewWrap.appendChild(attrViewContent);
			domPathWrap.appendChild(domPath);
			domPathWrap.appendChild(domPathScrollLeft);
			domPathWrap.appendChild(domPathScrollRight);
			naviButtons.appendChild(naviLookup);
			naviButtons.appendChild(naviConfig);
			naviWrap.appendChild(domPathWrap);
			naviWrap.appendChild(naviButtons);
			wrapper.appendChild(optionsView);
			wrapper.appendChild(domViewWrap);
			wrapper.appendChild(horizSplit);
			wrapper.appendChild(attrViewWrap);
			wrapper.appendChild(naviWrap);
			wrapper.appendChild(vertSplit);

			// cache UI object and append to the DOM
			document.getElementsByTagName('body')[0].appendChild(wrapper);
			uiView = wrapper;
			menuView = naviWrap;
			domView = uiView.querySelector('#adi-dom-view');
			attrView = uiView.querySelector('#adi-attr-view');
			pathView = domPath;
			optsView = optionsView;
			refreshUI(true);
		}

		// Refreshes the global UI
		function refreshUI(refreshOpts) {
			if (uiView === null) {
				return false;
			}

			// load options if requested (e.g. before the first UI refresh)
			if (refreshOpts) {
				loadOptions();
			}

			// Options view refresh
			if (refreshOpts) {
				optsView.querySelector('[data-opt="transparent"]').checked = options.transparent;
				optsView.querySelector('[data-opt="saving"]').checked = options.saving;
				optsView.querySelector('[data-opt="omitEmptyText"]').checked = options.omitEmptyText;
				optsView.querySelector('[data-opt="makeVisible"]').checked = options.makeVisible;
				optsView.querySelector('[data-opt="foldText"]').checked = options.foldText;
				optsView.querySelector('[data-opt="nodeTypes-3"]').checked = options.nodeTypes.indexOf(3) !== -1;
				optsView.querySelector('[data-opt="nodeTypes-8"]').checked = options.nodeTypes.indexOf(8) !== -1;
				// optsView.querySelector('[data-opt="nodeTypes-1"]').checked = options.nodeTypes.indexOf(1) !== -1;
				// optsView.querySelector('[data-opt="nodeTypes-9"]').checked = options.nodeTypes.indexOf(9) !== -1;
			}

			// UI appearance refresh
			uiView.className = options.transparent ? 'transparent' : '';
			uiView.style.display = options.visible ? 'block' : 'none';
			uiView.style.width = options.width + 'px';
			menuView.style.width = options.width + 'px';
			domView.style.height = options.split + '%';
			attrView.style.height = (100 - options.split) + '%';
			domView.querySelector('.adi-content').style.height = domView.clientHeight + 'px';
			attrView.querySelector('.adi-content').style.height = (attrView.clientHeight - menuView.clientHeight) + 'px';
			addClass(uiView, options.align);
		}

		// UI visibility toggle handler
		function toggleVisibilityUI() {
			if (uiView === null) {
				return false;
			}

			uiView.style.display = options.visible ? 'none' : 'block';
			options.visible = !options.visible;
			saveOptions();
		}

		// Helper function for attributes view
		function drawAttrRow(attrName, attrValue) {
			var row = newElement('span', { class: 'adi-attr' });
			row.innerHTML = '<label>' + attrName + ': <input type="text" data-attr="' + attrName + '" value="' + attrValue + '"></label>';

			return row;
		}

		// Renders the attribute view
		function drawAttrs(elem) {
			if (typeof elem !== 'object') {
				throw "drawAttrs: Expected argument elem of type object, " + typeof elem + " given.";
			}

			var content = attrView.querySelector('.adi-content'),
				attrsMain = {
					'id': '',
					'class': '',
					'style': ''
				},
				attrsOther = {},
				keys = [],
				attr, i, len;

			// prepare attributes
			content.innerHTML = '';
			for (i = 0, len = elem.attributes.length; i < len; ++i) {
				attr = elem.attributes[i];

				switch (attr.nodeName.toLowerCase()) {
					case 'id':
						attrsMain['id'] = attr.nodeValue;
						break;
					case 'class':
						attrsMain['class'] = attr.nodeValue;
						break;
					case 'style':
						attrsMain['style'] = styleBackup;
						break;
					default:
						attrsOther[attr.nodeName.toLowerCase()] = attr.nodeValue;
				}
			}

			// sort attributes
			for (var key in attrsOther) {
				keys.push(key);
			}
			keys.sort();

			// render the content
			content.appendChild(drawAttrRow('id', attrsMain['id']));
			content.appendChild(drawAttrRow('class', attrsMain['class']));
			content.appendChild(drawAttrRow('style', attrsMain['style']));
			content.appendChild(newElement('hr'));

			for (i = 0, len = keys.length; i < len; ++i) {
				content.appendChild(drawAttrRow(keys[i], attrsOther[keys[i]]));
			}
		}

		// Handles attribute changes
		function changeAttribute(e) {
			var target = e ? e.target : window.event.srcElement,
				attr = target.getAttribute('data-attr'),
				val = target.value,
				elem = getSelected();

			// remove attribute if the new value is empty
			if (val === '') {
				elem.removeAttribute(attr);
			} else {
				elem.setAttribute(attr, val);
			}
		}

		// Handles option changes
		function changeOption(e) {
			var target = e ? e.target : window.event.srcElement,
				data = target.getAttribute('data-opt'),
				val = target.checked;

			if (data.indexOf('nodeTypes') !== -1) {
				var type = parseInt(data.match(/\d+/)[0]);

				if (val) {
					options.nodeTypes.push(type);
				} else {
					options.nodeTypes.splice(options.nodeTypes.indexOf(type), 1);
				}
			} else {
				options[data] = val;
			}
		}

		// Key events processing
		function processKey(e) {
			e = e || window.event;
			var code = e.keyCode || e.which;

			switch (code) {
				case 272: // ctrl + alt + d
					toggleVisibilityUI();
					break;
			}
		}

		// Vertical splitter resize handler
		function verticalResize(e) {
			if (!vertResizing) {
				return;
			}

			e = e || window.event;
			document.documentElement.style.cursor = 'e-resize';
			var nWidth = options.width + xPos - e.clientX;

			if (nWidth >= options.minWidth) {
				options.width = nWidth;
				xPos = e.clientX;
				refreshUI();
				saveOptions();
			}

			checkPathOverflow();
		}

		// Horizontal splitter resize handler
		function horizontalResize(e) {
			if (!horizResizing) {
				return;
			}

			e = e || window.event;
			document.documentElement.style.cursor = 'n-resize';
			var nSplit = Math.floor(e.clientY / uiView.clientHeight * 100);

			if (nSplit >= options.minSplit && nSplit <= 100 - options.minSplit) {
				options.split = nSplit;
				refreshUI();
				saveOptions();
			}
		}

		// Dom view folding handler
		function handleFolding(e) {
			var target = e ? e.target : window.event.srcElement,
				ul = target.parentNode.querySelector('ul');

			if (ul.getAttribute('data-open') === "true") {
				removeClass(target, 'opened');
				addClass(target, 'closed');
				ul.setAttribute('data-open', "false");
			} else {
				removeClass(target, 'closed');
				addClass(target, 'opened');
				ul.setAttribute('data-open', "true");
			}
		}

		// Handles active element selection
		function handleActive(e) {
			var target = e ? e.target : window.event.srcElement,
				active = domView.querySelector('.adi-active-node');

			if (active) {
				removeClass(active, 'adi-active-node');
			}

			// clicked on normal-node or end-node?
			if (target.className === 'adi-end-node') {
				target = target.parentNode.querySelector('.adi-normal-node');
			}

			activeElement = target;
			addClass(target, 'adi-active-node');
			pathView.textContent = target.getAttribute('data-css-path');

			// make it visible (scroll)
			if (options.makeVisible) {
				var wrap = domView.querySelector('.adi-content');
				if (target.offsetTop >= wrap.clientHeight || target.offsetTop <= wrap.scrollTop) {
					wrap.scrollTop = target.offsetTop - (Math.floor(wrap.clientHeight / 2));
				}
			}

			checkPathOverflow();
			drawAttrs(getSelected());
		}

		// Checks if pathView is overflowing or not
		function checkPathOverflow() {
			if (pathView.scrollWidth > pathView.clientWidth) {
				addClass(pathView.parentNode, 'adi-overflowing');
			} else {
				removeClass(pathView.parentNode, 'adi-overflowing');
			}
		}

		// Handles scroll behavior for overflowing pathView
		function scrollPathView(e) {
			var target = e ? e.target : window.event.srcElement,
				maxScroll = pathView.scrollWidth - pathView.clientWidth,
				scroll = pathView.scrollLeft,
				change = 5;

				if (target.className === "adi-path-right") {
					pathView.scrollLeft = (scroll <= maxScroll - change) ? scroll + change : maxScroll;
				} else {
					pathView.scrollLeft = (scroll - change >= 0) ? scroll - change : 0;
				}

			if (!pathScrolling) {
				pathScrolling = setInterval(scrollPathView, 20, e);
			}
		}

		// Highlights an element on page
		function highlightElement(e) {
			var target = e ? e.target : window.event.srcElement,
				node = document,
				path;

			if (target.className === 'adi-end-node') {
				target = target.parentNode.querySelector('.adi-normal-node');
			}

			path = JSON.parse(target.getAttribute('data-js-path'));

			// find the element
			for (var i = 0, len = path.length; i < len; ++i) {
				node = node.childNodes[path[i]];
			}

			if (node) {
				if (e.type === 'mouseover') {
					styleBackup = node.getAttribute('style') || '';
					node.setAttribute('style', 'outline: 1px dashed red; ' + styleBackup);
				} else {
					if (styleBackup === '') {
						node.removeAttribute('style');
					} else {
						node.setAttribute('style', styleBackup);
					}
				}
			}
		}

		// Handles element lookup on page
		function handleLookup(e) {
			var target = e ? e.target : window.event.srcElement;

			if (target.className.indexOf('adi-menu-lookup') !== -1) {
				// enable/disable interactive lookup
				if (elemLookup) {
					removeClass(target, 'adi-active');
					elemLookup = false;
					removeEvent(document.body, 'mouseover', handleLookup, true);
					removeEvent(document.body, 'mouseout', handleLookup, true);
					removeEvent(document.body, 'click', handleLookup, true);
				} else {
					addClass(target, 'adi-active');
					elemLookup = true;
					addEventDelegate(document.body, 'mouseover', handleLookup, false, '*', true, 'adi-wrapper');
					addEventDelegate(document.body, 'mouseout', handleLookup, false, '*', true, 'adi-wrapper');
					addEventDelegate(document.body, 'click', handleLookup, false, '*', true, 'adi-wrapper');
				}
			} else {
				// handle lookup events
				if (e.type === 'mouseover') {
					styleBackup = target.getAttribute('style') || '';
					target.setAttribute('style', 'outline: 1px dashed red; ' + styleBackup);
				} else if (e.type === 'mouseout') {
					target.setAttribute('style', styleBackup);
				} else {
					elemLookup = false;
					removeClass(menuView.querySelector('.adi-menu-lookup'), 'adi-active');
					target.setAttribute('style', styleBackup);
					removeEvent(document.body, 'mouseover', handleLookup, true);
					removeEvent(document.body, 'mouseout', handleLookup, true);
					removeEvent(document.body, 'click', handleLookup, true);
					pauseEvent(e);

					// find corresponding node in the DOM view
					var path = getElemPaths(target),
						active = domView.querySelector('[data-js-path=\'' + JSON.stringify(path.jsPath) + '\']');

					// activate it
					if (active) {
						active.click();
					}

					// open the whole path in DOM view
					var node = active.parentNode,
						tmp;

					if (node.querySelector('ul')) {
						node.querySelector('ul').setAttribute('data-open', 'true');
					}
					while(node !== domView.querySelector('.adi-content')) {
						if (node.className.indexOf('adi-node') !== -1) {
							tmp = node.querySelector('.adi-trigger');
							removeClass(tmp, 'closed');
							addClass(tmp, 'opened');

							node = node.parentNode;	// ul node
							node.setAttribute('data-open', 'true');
						}

						node = node.parentNode;
					}

					// make it visible (scroll)
					if (options.makeVisible) {
						var wrap = domView.querySelector('.adi-content');
						if (active.offsetTop >= wrap.clientHeight || active.offsetTop <= wrap.scrollTop) {
							wrap.scrollTop = active.offsetTop - (Math.floor(wrap.clientHeight / 2));
						}
					}
				}
			}
		}

		// Event registration
		function registerEvents() {
			var vertSplit = document.getElementById('adi-vert-split'),
				horizSplit = document.getElementById('adi-horiz-split');

			// events for splitters
			addEvent(vertSplit,  'mousedown', function(e) {
				e = e || window.event;
				pauseEvent(e);
				vertResizing  = true;
				xPos = e.clientX;
			}, false);

			addEvent(horizSplit, 'mousedown', function(e) {
				e = e || window.event;
				pauseEvent(e);
				horizResizing = true;
			}, false);

			addEvent(document, 'mouseup', function() {
				document.documentElement.style.cursor = 'default';
				vertResizing  = false;
				horizResizing = false;
			}, false);

			addEvent(document, 'mousemove', verticalResize, false);
			addEvent(document, 'mousemove', horizontalResize, false);

			// window resize
			addEvent(window, 'resize', refreshUI, false);

			// keypress events
			addEvent(document, 'keypress', processKey, false);

			// dom tree view folding
			addEventDelegate(domView, 'click', handleFolding, false, '.adi-trigger');

			// active element
			addEventDelegate(domView, 'click', handleActive, false, '.adi-normal-node');
			addEventDelegate(domView, 'click', handleActive, false, '.adi-end-node');

			// path view scrolling
			addEventDelegate(pathView.parentNode, 'mousedown', scrollPathView, false, '.adi-path-left');
			addEventDelegate(pathView.parentNode, 'mousedown', scrollPathView, false, '.adi-path-right');
			addEventDelegate(pathView.parentNode, 'mouseup', function() {
				clearInterval(pathScrolling);
				pathScrolling = false;
			}, false, '.adi-path-left');
			addEventDelegate(pathView.parentNode, 'mouseup', function() {
				clearInterval(pathScrolling);
				pathScrolling = false;
			}, false, '.adi-path-right');

			// matching tag highlighting
			addEventDelegate(domView, 'mouseover', function(e) {
				var target = e ? e.target : window.event.srcElement;
				addClass(target.parentNode.querySelector('.adi-normal-node'), 'hover');
			}, false, '.adi-end-node');
			addEventDelegate(domView, 'mouseout', function(e) {
				var target = e ? e.target : window.event.srcElement;
				removeClass(target.parentNode.querySelector('.adi-normal-node'), 'hover');
			}, false, '.adi-end-node');

			// page element highlighting
			addEventDelegate(domView, 'mouseover', highlightElement, false, '.adi-end-node');
			addEventDelegate(domView, 'mouseover', highlightElement, false, '.adi-normal-node');
			addEventDelegate(domView, 'mouseout', highlightElement, false, '.adi-end-node');
			addEventDelegate(domView, 'mouseout', highlightElement, false, '.adi-normal-node');

			// element lookup
			addEvent(menuView.querySelector('.adi-menu-lookup'), 'click', handleLookup, false);

			// options events
			addEventDelegate(optsView, 'change', changeOption, false, 'input');
			addEventDelegate(optsView, 'click', toggleOptions, false, '.adi-opt-close');
			addEvent(menuView.querySelector('.adi-menu-config'), 'click', toggleOptions, false);

			// attributes events
			addEventDelegate(attrView, 'change', changeAttribute, false, 'input');
		}

		drawUI();
		registerEvents();
		drawDOM(document, domView.querySelector('.adi-tree-view'), true);

		return {
			// TODO: public methods and variables (this will be visible to the global scope)
			getSelectedElement: getSelected,
			toggle: toggleVisibilityUI
		};
	})();

	// Application entry point
	function appInit() {
		consoleShim();

		// make public API visible to the global scope
		window.ADI = ADI;
	}

	// Launch the app when the DOM is ready and all assets are loaded
	addEvent(window, 'load', appInit, false);
})(this, document);
