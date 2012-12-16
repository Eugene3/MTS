MTS.Views.WorkWeek = Backbone.View.extend({
	template_week: JST["TemplateTrWeek"],
	template_day: JST["TemplateDay"],
	template_table: JST["TemplateTableWeek"],
	el: '#work-days',
	
	initialize: function() {
		MTS.Instances.SelectedDoctorsTT.on("add", this.show, this);
		MTS.Instances.SelectedDoctorsTT.on("remove", this.show, this);
		count = 0;
		arreyAttr = new Array;
	},
	
	showTable: function() {
		$(this.el).append(this.template_table);
	},
	
	render: function(day_time) {
		var div = '';
		week = JSON.parse(day_time.get('workingTimeHash'));
		for (var j = 0; j < week.length; j++) {
			day_time.set('time_line', week[j].from + '-' + week[j].to);
			day_time.set('day', week[j].day);
			div += this.template_day(day_time.toJSON());
		}
		$(this.el).append(this.template_week(day_time.toJSON()));
		$("#wd_td_2__" + day_time.get("doctorId")).append(div);
	},
	
	show: function() {
	    this.$el.empty();
		this.showTable();
		for (var i = 0; i < MTS.Instances.SelectedDoctorsTT.models.length; i++) {
			this.render(MTS.Instances.SelectedDoctorsTT.models[i]);
		}
		if (MTS.Instances.SelectedDoctorsTT.models.length <= 0) {
			 this.$el.empty();
			 for (var key in arreyAttr)
				delete arreyAttr[key];
		}
		for (var key in arreyAttr)
			$(arreyAttr[key]).css("background-color","lime");
	}	
});