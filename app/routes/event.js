import Ember from "ember";

export default Ember.Route.extend({
    localStorage: Ember.inject.service(),

    model(params) {
        return this.store.find("event", params.event_id);
    },

    afterModel(model) {
        this.get("localStorage").push(
            "events",
            Ember.Object.create(model.getProperties("id", "name"))
        );
    },

    setupController(controller, model) {
        this._super(...arguments);
        const previousEvents = this.modelFor("application").previousEvents;
        const otherEvents = previousEvents.rejectBy("id", model.id);

        controller.setProperties({ otherEvents });
    },

    actions: {
        saveChanges() {
            const event = this.modelFor("event");

            event.save();
        },
    },
});
