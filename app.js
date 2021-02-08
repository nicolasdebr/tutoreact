var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scaleNames = {
    c: 'celsius',
    f: 'farenheit'
};
function BoilingVerdict(_ref) {
    var celsius = _ref.celsius;

    if (celsius >= 100) {
        return React.createElement(
            'div',
            { className: 'alert alert-success' },
            'L\'eau bout'
        );
    }

    return React.createElement(
        'div',
        { className: 'alert alert-info' },
        'L\'eau ne bout pas'
    );
}
function tryConvert(temperature, convert) {
    var value = parseFloat(temperature);
    if (Number.isNaN(value)) {
        return '';
    } else {
        return (Math.round(convert(value) * 100) / 100).toString();
    }
}
function toCelsius(farenheit) {
    return (farenheit - 32) * 5 / 9;
}
function toFarenheit(celcius) {
    return celcius * 9 / 5 + 32;
}

var TemperatureInput = function (_React$Component) {
    _inherits(TemperatureInput, _React$Component);

    function TemperatureInput(props) {
        _classCallCheck(this, TemperatureInput);

        var _this = _possibleConstructorReturn(this, (TemperatureInput.__proto__ || Object.getPrototypeOf(TemperatureInput)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(TemperatureInput, [{
        key: 'handleChange',
        value: function handleChange(e) {

            this.props.onTemperatureChange(e.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            var temperature = this.props.temperature;

            var name = 'scale' + this.props.scale;
            var scaleName = scaleNames[this.props.scale];
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: name },
                        'Saisissez la temp\xE9rature en ',
                        scaleName,
                        ' : '
                    ),
                    React.createElement('input', { type: 'text', id: name, value: temperature, onChange: this.handleChange, className: 'form-control' })
                )
            );
        }
    }]);

    return TemperatureInput;
}(React.Component);

var Calculator = function (_React$Component2) {
    _inherits(Calculator, _React$Component2);

    function Calculator(props) {
        _classCallCheck(this, Calculator);

        var _this2 = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

        _this2.state = {
            scale: 'c',
            temperature: 20
        };
        _this2.handleCelciusChange = _this2.handleCelciusChange.bind(_this2);
        _this2.handleFarenheitChange = _this2.handleFarenheitChange.bind(_this2);
        return _this2;
    }

    _createClass(Calculator, [{
        key: 'handleCelciusChange',
        value: function handleCelciusChange(temperature) {
            this.setState({ scale: 'c', temperature: temperature });
        }
    }, {
        key: 'handleFarenheitChange',
        value: function handleFarenheitChange(temperature) {
            this.setState({ scale: 'f', temperature: temperature });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                temperature = _state.temperature,
                scale = _state.scale;

            var celcius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius);
            var farenheit = scale === 'f' ? temperature : tryConvert(temperature, toFarenheit);
            return React.createElement(
                'div',
                null,
                React.createElement(TemperatureInput, { scale: 'c', temperature: celcius, onTemperatureChange: this.handleCelciusChange }),
                React.createElement(TemperatureInput, { scale: 'f', temperature: farenheit, onTemperatureChange: this.handleFarenheitChange }),
                React.createElement(BoilingVerdict, { celsius: celcius })
            );
        }
    }]);

    return Calculator;
}(React.Component);

ReactDOM.render(React.createElement(Calculator, null), document.querySelector('#app'));