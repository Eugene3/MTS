MTS.Views.WorkDayView = Backbone.View.extend({
	template_tr : JST["TemplateTr"],
	template_span : JST["TimetableTicket"],
	el_tr : '#tablebody',
	initialize : function()
	{
		dayCollection = collectionDays;
		dayCollection.on("add", this.render, this);
		   
	},
	getCount : function()
	{
		var count  = 60/day.get('duration');
			if(count == 1)
				day.set('duration_class', 'hour');
			if(count == 2)
				day.set('duration_class', 'half');
			if(count == 4)
				day.set('duration_class', 'quarter');
		return count;
	},
	setTime: function(time, from, to)
	{
		if(time[1] == 0)
			time[1] ="00";
		if(parseInt(time[0])>=parseInt(from[0])&&parseInt(time[0])<parseInt(to[0]))
		{
			day.set('ticket_time', time[0]+ ':' + time[1]);
			dur = day.get('duration_class');
			day.set('duration_class', day.get('duration_class')+' color_ticket');
			return 1;
		}
		else
		{
			day.set('ticket_time', '-');
			return 0;
		}
	},
	render : function()
	{
		var div = '', flag = 0;
		dur = '';
		var time = day.get('ticket_time').split(':'), from = day.get('from').split(':'), to = day.get('to').split(':'); 		
		for(j = 0; j <= 8; j++)
		{
			time[1] = 0;
			var count = this.getCount();
			for(i = 0; i < count; i++)
			{
				flag = this.setTime(time, from, to);
				if(parseInt(time[0])/10<1)
					time[0]='0'+parseInt(time[0]);
				day.set('ticket_t', time[0]+'' + time[1]);
				div += this.template_span(day.toJSON());
				if(flag == 1)
				{
					day.set('duration_class', dur);
					flag = 0;
				}
				duration = parseInt(day.get('duration'));
				time[1] = parseInt(time[1]) + duration;
			}
			time[0]++;
			day.set('ticket_time', time[0]+':' + time[1]);
		}
		$(this.el_tr).append(this.template_tr(day.toJSON()));
		$("#td_2_doc__" + day.get("doc_id") + "__" + day.get("data")).append(div);
	}
});