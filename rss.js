$(document).ready(function() {
	$('#generate').click(function() {
		var title = $('#title').val();
		var link = $('#link').val();
		var description = $('#description').val();
		var items = [];
		var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
		xml += '<rss version="2.0">\n';
		xml += '<channel>\n';
		xml += '<title>' + title + '</title>\n';
		xml += '<link>' + link + '</link>\n';
		xml += '<description>' + description + '</description>\n';
		xml += '<language>zh-cn</language>\n';
		xml += '<generator>ChatGPT RSS generator</generator>\n';

		// 添加项目到RSS源
		$.each(items, function(index, item) {
			xml += '<item>\n';
			xml += '<title>' + item.title + '</title>\n';
			xml += '<link>' + item.link + '</link>\n';
			xml += '<description>' + item.description + '</description>\n';
			xml += '<pubDate>' + item.pubDate + '</pubDate>\n';
			xml += '</item>\n';
		});

		xml += '</channel>\n';
		xml += '</rss>';

		// 将RSS源保存为XML文件
		var blob = new Blob([xml], {type: "text/xml;charset=utf-8"});
		saveAs(blob, "rss.xml");

		// 生成并显示RSS链接
		var rssLink = '<link rel="alternate" type="application/rss+xml" title="' + title + '" href="rss.xml"/>';
		$('#rss-link').html(rssLink);
	});
});
