class DropdownManager {
  _defaultDropdown: any;

  register(_ref: any) {
    if (!this._defaultDropdown) {
      this._defaultDropdown = _ref;
    }
  }

  unregister(_ref: any) {
    if (!!this._defaultDropdown && this._defaultDropdown._id === _ref._id) {
      this._defaultDropdown = null;
    }
  }

  getDefault() {
    return this._defaultDropdown;
  }
}

export default new DropdownManager();
