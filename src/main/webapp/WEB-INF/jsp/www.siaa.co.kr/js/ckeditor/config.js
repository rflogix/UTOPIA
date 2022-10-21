/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// config.uiColor = '#AADC6E';
	
	config.language = 'ko';
	config.enterMode = '2'; // 1:p, 2:br, 3:div
	config.shiftEnterMode = '2'; // 1:p, 2:br, 3:div
	//config.fullPage = true; // @@@@@@@@@@@@@@@@@@@@@@@@
	//config.htmlEncodeOutput = true;
	
	config.skin='moono';
	config.toolbarGroups = [
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'paragraph', groups: [ 'align', 'indent', 'list', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = "Templates,Find,Replace,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Anchor,Flash,Iframe,ShowBlocks,CreateDiv,Blockquote,BidiLtr,BidiRtl,RemoveFormat,CopyFormatting,Maximize,Source";
	config.removeDialogTabs = 'link:target;link:upload;link:advanced;image:info;image:Link;image:advanced';	// 자세히, 링크 탭 제거 - config.filebrowserUploadUrl 설정하면 link 에서도 파일 업로드가 나와버림
	
	config.extraPlugins = "widget,image2"; // 이미지 업로드는 위젯으로 처리
	config.filebrowserImageUploadUrl = "/board/image_upload"; // cke 폴더 안으로 지정하면 2번째 파일 선택부터 경로 에러남, 루트에 있는 파일로 지정
};
