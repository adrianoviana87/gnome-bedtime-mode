const Signals = imports.signals;
const { extensionUtils } = imports.misc;

const Me = extensionUtils.getCurrentExtension();

const { logDebug } = Me.imports.utils;

var Settings = class {
  constructor() {
    logDebug("Initializing  settings...");
    this.settings = extensionUtils.getSettings();

    logDebug("Settings initialized.");
  }

  enable() {
    logDebug("Connecting settings signals...");

    this._automaticScheduleConnect = this.settings.connect("changed::automatic-schedule", this._onAutomaticScheduleChanged.bind(this));

    this._scheduleStartHoursConnect = this.settings.connect("changed::schedule-start-hours", this._onScheduleStartHoursChanged.bind(this));
    this._scheduleStartMinutesConnect = this.settings.connect("changed::schedule-start-minutes", this._onScheduleStartMinutesChanged.bind(this));
    this._scheduleEndHoursConnect = this.settings.connect("changed::schedule-end-hours", this._onScheduleEndHoursChanged.bind(this));
    this._scheduleEndMinutesConnect = this.settings.connect("changed::schedule-end-minutes", this._onScheduleEndMinutesChanged.bind(this));

    logDebug("Settings signals connected.");
  }

  disable() {
    logDebug("Disconnecting settings signals...");

    this.settings.disconnect(this._automaticScheduleConnect);

    this.settings.disconnect(this._scheduleStartHoursConnect);
    this.settings.disconnect(this._scheduleStartMinutesConnect);
    this.settings.disconnect(this._scheduleEndHoursConnect);
    this.settings.disconnect(this._scheduleEndMinutesConnect);

    logDebug("Settings signals disconnected.");
  }

  get automaticSchedule() {
    return this.settings.get_boolean("automatic-schedule");
  }

  set automaticSchedule(value) {
    if (value !== this.automaticSchedule) {
      this.settings.set_boolean("automatic-schedule", value);

      logDebug(`Automatic Schedule has been set to ${value}`);
    }
  }

  _onAutomaticScheduleChanged(_settings, _changedKey) {
    logDebug(`Automatic Schedule has been ${this.automaticSchedule ? "enabled" : "disabled"}`);

    this.emit("automatic-schedule-changed", this.automaticSchedule);
  }

  get scheduleStartHours() {
    return this.settings.get_int("schedule-start-hours");
  }

  set scheduleStartHours(value) {
    if (value !== this.scheduleStartHours) {
      this.settings.set_int("schedule-start-hours", value);

      logDebug(`Schedule Start Hours has been set to ${value}`);
    }
  }

  _onScheduleStartHoursChanged(_settings, _changedKey) {
    logDebug(`Schedule Start Hours changed to ${this.scheduleStartHours}`);

    this.emit("schedule-start-hours-changed", this.scheduleStartHours);
  }

  get scheduleStartMinutes() {
    return this.settings.get_int("schedule-start-minutes");
  }

  set scheduleStartMinutes(value) {
    if (value !== this.scheduleStartMinutes) {
      this.settings.set_int("schedule-start-minutes", value);
    }
  }

  _onScheduleStartMinutesChanged(_settings, _changedKey) {
    this.emit("schedule-start-minutes-changed", this.scheduleStartMinutes);
  }

  get scheduleEndHours() {
    return this.settings.get_int("schedule-end-hours");
  }

  set scheduleEndHours(value) {
    if (value !== this.scheduleEndHours) {
      this.settings.set_int("schedule-end-hours", value);
    }
  }

  _onScheduleEndHoursChanged(_settings, _changedKey) {
    this.emit("schedule-end-hours-changed", this.scheduleEndHours);
  }

  get scheduleEndMinutes() {
    return this.settings.get_int("schedule-end-minutes");
  }

  set scheduleEndMinutes(value) {
    if (value !== this.scheduleEndMinutes) {
      this.settings.set_int("schedule-end-minutes", value);
    }
  }

  _onScheduleEndMinutesChanged(_settings, _changedKey) {
    this.emit("schedule-end-minutes-changed", this.scheduleEndMinutes);
  }
};
Signals.addSignalMethods(Settings.prototype);
