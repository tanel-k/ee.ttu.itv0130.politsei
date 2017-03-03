define('app',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var App = exports.App = function () {
		function App() {
			_classCallCheck(this, App);
		}

		App.prototype.configureRouter = function configureRouter(config, router) {
			this.router = router;
			router.title = 'Politsei';

			config.map([{ route: ['', 'report'], name: 'report', moduleId: 'report-form', title: 'Avalduse esitamine' }, { route: 'complete', name: 'complete', moduleId: 'form-submitted', title: 'Avaldus esitatud' }]);
		};

		return App;
	}();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('form-submitted',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var FormSubmitted = exports.FormSubmitted = function FormSubmitted() {
		_classCallCheck(this, FormSubmitted);
	};
});
define('main',['exports', './environment'], function (exports, _environment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.configure = configure;

	var _environment2 = _interopRequireDefault(_environment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	Promise.config({
		warnings: {
			wForgottenReturn: false
		}
	});

	function configure(aurelia) {
		aurelia.use.standardConfiguration().feature('validation').feature('resources');

		if (_environment2.default.debug) {
			aurelia.use.developmentLogging();
		}

		if (_environment2.default.testing) {
			aurelia.use.plugin('aurelia-testing');
		}

		aurelia.start().then(function () {
			return aurelia.setRoot();
		});
	}
});
define('models',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Damage = exports.Event = exports.Witness = exports.Suspect = exports.Reporter = exports.Person = exports.Report = undefined;

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var Report = exports.Report = function Report() {
		_classCallCheck(this, Report);

		this.reporter = new Reporter();
		this.event = new Event();
		this.damages = [];
		this.suspects = [];
		this.witnesses = [];
		this.agreeToSettlement = false;
		this.agreeToEmailedDocs = false;
		this.useEDossier = false;
	};

	var Person = exports.Person = function Person() {
		_classCallCheck(this, Person);

		this.firstName = '';
		this.lastName = '';
		this.SSN = '';
		this.dateOfBirth = '';
		this.nationality = '';
		this.occupation = '';
		this.phoneNumber = '';
		this.email = '';
		this.address = '';
	};

	var Reporter = exports.Reporter = function (_Person) {
		_inherits(Reporter, _Person);

		function Reporter() {
			_classCallCheck(this, Reporter);

			var _this = _possibleConstructorReturn(this, _Person.call(this));

			_this.preferredModeOfContact = 'phone';
			_this.contactTime = '';
			_this.isJuridicialPerson = false;
			return _this;
		}

		return Reporter;
	}(Person);

	var Suspect = exports.Suspect = function (_Person2) {
		_inherits(Suspect, _Person2);

		function Suspect() {
			_classCallCheck(this, Suspect);

			var _this2 = _possibleConstructorReturn(this, _Person2.call(this));

			_this2.description = '';
			return _this2;
		}

		return Suspect;
	}(Person);

	var Witness = exports.Witness = function (_Person3) {
		_inherits(Witness, _Person3);

		function Witness() {
			_classCallCheck(this, Witness);

			return _possibleConstructorReturn(this, _Person3.call(this));
		}

		return Witness;
	}(Person);

	var Event = exports.Event = function Event() {
		_classCallCheck(this, Event);

		this.description = '';
		this.dateEvent = '';
		this.timeEvent = '';
		this.country = '';
		this.address = '';
		this.location = '';
	};

	var Damage = exports.Damage = function Damage() {
		_classCallCheck(this, Damage);

		this.name = '';
		this.valueEstimate = '';
		this.yearOfPurchase = '';
		this.dateLastHad = '';
		this.timeLastHad = '';
		this.dateNoticedMissing = '';
		this.timeNoticedMissing = '';
		this.description = '';
	};
});
define('report-form',['exports', 'aurelia-framework', './models', './resources/elements/progress-tracker', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _models, _progressTracker, _aureliaEventAggregator) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ReportForm = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var _dec, _class;

	var ReportForm = exports.ReportForm = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function ReportForm(eventAggregator) {
			_classCallCheck(this, ReportForm);

			this.eventAggregator = eventAggregator;
			this.report = new _models.Report();

			this.pages = [{ pageKey: 'instructions-form', name: 'Juhend' }, { pageKey: 'event-form', name: 'Sündmus' }, { pageKey: 'reporter-form', name: 'Isikuandmed' }, { pageKey: 'reporter-contact-form', name: 'Kontaktandmed' }, { pageKey: 'damages-form', name: 'Varaline kahju' }, { pageKey: 'suspects-form', name: 'Süüdistatavad' }, { pageKey: 'witnesses-form', name: 'Tunnistajad' }, { pageKey: 'submission-form', name: 'Esitamine' }];
			this.pages.forEach(function (page, i) {
				page.progressState = _progressTracker.progressState.unvisited;
				page.staticIndex = i;
			});
			var firstForm = this.pages[0];

			firstForm.progressState = _progressTracker.progressState.current;
			this.activePage = firstForm;
			this.thresholdPage = firstForm;
		}

		ReportForm.prototype.activate = function activate() {
			var _this = this;

			this.eventAggregator.subscribe(_progressTracker.TrackerClickedEvent, function (event) {
				if (_this.activePage.pageKey == event.pageKey) return;

				var targetPage = _this.findPageByKey(event.pageKey);
				_this.doNavigation(targetPage);
			});
		};

		ReportForm.prototype.doNavigation = function doNavigation(targetPage) {
			if (this.onThresholdPage()) {
				this.navigateFromThreshold(targetPage);
			} else {
				this.navigateFromVisited(targetPage);
			}
		};

		ReportForm.prototype.navigateFromThreshold = function navigateFromThreshold(targetPage) {
			var isPageValid = true;
			var backNav = targetPage.staticIndex < this.thresholdPage.staticIndex;

			if (backNav || isPageValid) {
				if (backNav) {
					this.activePage.progressState = _progressTracker.progressState.threshold;
				} else {
					this.activePage.progressState = _progressTracker.progressState.visited;
					this.thresholdPage = targetPage;
				}

				targetPage.progressState = _progressTracker.progressState.current;
				this.activePage = targetPage;
			}
		};

		ReportForm.prototype.navigateFromVisited = function navigateFromVisited(targetPage) {
			var isPageValid = true;

			if (isPageValid) {
				this.activePage.progressState = _progressTracker.progressState.visited;
				targetPage.progressState = _progressTracker.progressState.current;
				this.activePage = targetPage;
			}
		};

		ReportForm.prototype.nextPage = function nextPage() {
			if (this.hasNextPage) {
				var targetPage = this.findPageByIndex(this.activePage.staticIndex + 1);
				console.log(targetPage);
				this.doNavigation(targetPage);
			}
		};

		ReportForm.prototype.previousPage = function previousPage() {
			if (this.hasPreviousPage) {
				var targetPage = this.findPageByIndex(this.activePage.staticIndex - 1);
				console.log(targetPage);
				this.doNavigation(targetPage);
			}
		};

		ReportForm.prototype.onThresholdPage = function onThresholdPage() {
			return this.thresholdPage.staticIndex == this.activePage.staticIndex;
		};

		ReportForm.prototype.findPageByKey = function findPageByKey(pageKey) {
			return this.pages.find(function (page) {
				return page.pageKey == pageKey;
			});
		};

		ReportForm.prototype.findPageByIndex = function findPageByIndex(index) {
			return this.pages.find(function (page) {
				return page.staticIndex == index;
			});
		};

		_createClass(ReportForm, [{
			key: 'hasPreviousPage',
			get: function get() {
				return this.activePage.staticIndex > 0;
			}
		}, {
			key: 'hasNextPage',
			get: function get() {
				return this.activePage.staticIndex < this.pages.length - 1;
			}
		}, {
			key: 'onFirstPage',
			get: function get() {
				return this.activePage.staticIndex == 0;
			}
		}, {
			key: 'onLastPage',
			get: function get() {
				return this.activePage.staticIndex == this.pages.length - 1;
			}
		}]);

		return ReportForm;
	}()) || _class);
});
define('resources/index',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.configure = configure;
	function configure(config) {
		config.globalResources(['./elements/top-scroller', './elements/progress-tracker']);
	}
});
define('subforms/damages-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var DamagesForm = exports.DamagesForm = function DamagesForm(report) {
		_classCallCheck(this, DamagesForm);
	};
});
define('subforms/event-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var EventForm = exports.EventForm = function EventForm(report) {
		_classCallCheck(this, EventForm);
	};
});
define('subforms/reporter-contact-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ReporterContactForm = exports.ReporterContactForm = function ReporterContactForm(report) {
		_classCallCheck(this, ReporterContactForm);
	};
});
define('subforms/reporter-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ReporterForm = exports.ReporterForm = function ReporterForm(report) {
		_classCallCheck(this, ReporterForm);
	};
});
define('subforms/submission-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var SubmissionForm = exports.SubmissionForm = function SubmissionForm(report) {
		_classCallCheck(this, SubmissionForm);
	};
});
define('subforms/suspects-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var SuspectsForm = exports.SuspectsForm = function SuspectsForm(report) {
		_classCallCheck(this, SuspectsForm);
	};
});
define('subforms/witnesses-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var WitnessesForm = exports.WitnessesForm = function WitnessesForm(report) {
		_classCallCheck(this, WitnessesForm);
	};
});
define('validation/index',['exports', './rules'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.configure = configure;
	function configure(config) {
		config.plugin('aurelia-validation');
	}
});
define('validation/rules',[], function () {
  "use strict";
});
define('resources/elements/progress-tracker',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProgressTracker = exports.TrackerClickedEvent = exports.progressState = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _dec, _class, _desc, _value, _class2, _descriptor;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var progressState = exports.progressState = {
		'threshold': 'threshold',
		'unvisited': 'new',
		'visited': 'completed',
		'current': 'active'
	};

	var TrackerClickedEvent = exports.TrackerClickedEvent = function TrackerClickedEvent(pageKey) {
		_classCallCheck(this, TrackerClickedEvent);

		this.pageKey = pageKey;
	};

	var ProgressTracker = exports.ProgressTracker = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
		function ProgressTracker(eventAggregator) {
			_classCallCheck(this, ProgressTracker);

			_initDefineProp(this, 'pages', _descriptor, this);

			this.eventAggregator = eventAggregator;
		}

		ProgressTracker.prototype.trackerClick = function trackerClick(pageKey) {
			var targetPage = this.pages.find(function (page) {
				return page.pageKey == pageKey;
			});
			if (targetPage && targetPage.progressState != progressState.unvisited) {
				this.eventAggregator.publish(new TrackerClickedEvent(pageKey));
			}
		};

		return ProgressTracker;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'pages', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: function initializer() {
			return [];
		}
	})), _class2)) || _class);
});
define('resources/elements/top-scroller',['exports', 'aurelia-framework', 'jquery'], function (exports, _aureliaFramework) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TopScroller = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _dec2, _class;

	var TopScroller = exports.TopScroller = (_dec = (0, _aureliaFramework.customElement)('top-scroller'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
		function TopScroller(element) {
			_classCallCheck(this, TopScroller);

			this.element = element;
		}

		TopScroller.prototype.attached = function attached() {
			var wrapper = this.element.querySelector('.scroll-top-wrapper');

			document.addEventListener('scroll', function () {
				if ($(window).scrollTop() > 100) {
					wrapper.classList.add('show');
				} else {
					wrapper.classList.remove('show');
				}
			});

			wrapper.addEventListener('click', this.scrollToTop);
		};

		TopScroller.prototype.scrollToTop = function scrollToTop(e) {
			$('html, body').animate({ scrollTop: 0 }, 500, 'linear');
		};

		TopScroller.prototype.detached = function detached() {};

		return TopScroller;
	}()) || _class) || _class);
});
define('aurelia-validation/get-target-dom-element',["require", "exports", "aurelia-pal"], function (require, exports, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Gets the DOM element associated with the data-binding. Most of the time it's
     * the binding.target but sometimes binding.target is an aurelia custom element,
     * or custom attribute which is a javascript "class" instance, so we need to use
     * the controller's container to retrieve the actual DOM element.
     */
    function getTargetDOMElement(binding, view) {
        var target = binding.target;
        // DOM element
        if (target instanceof Element) {
            return target;
        }
        // custom element or custom attribute
        // tslint:disable-next-line:prefer-const
        for (var i = 0, ii = view.controllers.length; i < ii; i++) {
            var controller = view.controllers[i];
            if (controller.viewModel === target) {
                var element = controller.container.get(aurelia_pal_1.DOM.Element);
                if (element) {
                    return element;
                }
                throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
            }
        }
        throw new Error("Unable to locate target element for \"" + binding.sourceExpression + "\".");
    }
    exports.getTargetDOMElement = getTargetDOMElement;
});

define('aurelia-validation/property-info',["require", "exports", "aurelia-binding"], function (require, exports, aurelia_binding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getObject(expression, objectExpression, source) {
        var value = objectExpression.evaluate(source, null);
        if (value === null || value === undefined || value instanceof Object) {
            return value;
        }
        // tslint:disable-next-line:max-line-length
        throw new Error("The '" + objectExpression + "' part of '" + expression + "' evaluates to " + value + " instead of an object, null or undefined.");
    }
    /**
     * Retrieves the object and property name for the specified expression.
     * @param expression The expression
     * @param source The scope
     */
    function getPropertyInfo(expression, source) {
        var originalExpression = expression;
        while (expression instanceof aurelia_binding_1.BindingBehavior || expression instanceof aurelia_binding_1.ValueConverter) {
            expression = expression.expression;
        }
        var object;
        var propertyName;
        if (expression instanceof aurelia_binding_1.AccessScope) {
            object = source.bindingContext;
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessMember) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.name;
        }
        else if (expression instanceof aurelia_binding_1.AccessKeyed) {
            object = getObject(originalExpression, expression.object, source);
            propertyName = expression.key.evaluate(source);
        }
        else {
            throw new Error("Expression '" + originalExpression + "' is not compatible with the validate binding-behavior.");
        }
        if (object === null || object === undefined) {
            return null;
        }
        return { object: object, propertyName: propertyName };
    }
    exports.getPropertyInfo = getPropertyInfo;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('aurelia-validation/validate-binding-behavior',["require", "exports", "aurelia-task-queue", "./validate-trigger", "./validate-binding-behavior-base"], function (require, exports, aurelia_task_queue_1, validate_trigger_1, validate_binding_behavior_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the validate trigger specified by the associated controller's
     * validateTrigger property occurs.
     */
    var ValidateBindingBehavior = (function (_super) {
        __extends(ValidateBindingBehavior, _super);
        function ValidateBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateBindingBehavior.prototype.getValidateTrigger = function (controller) {
            return controller.validateTrigger;
        };
        return ValidateBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateBindingBehavior = ValidateBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property will be validated
     * manually, by calling controller.validate(). No automatic validation
     * triggered by data-entry or blur will occur.
     */
    var ValidateManuallyBindingBehavior = (function (_super) {
        __extends(ValidateManuallyBindingBehavior, _super);
        function ValidateManuallyBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateManuallyBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.manual;
        };
        return ValidateManuallyBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateManuallyBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateManuallyBindingBehavior = ValidateManuallyBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs.
     */
    var ValidateOnBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnBlurBindingBehavior, _super);
        function ValidateOnBlurBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateOnBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.blur;
        };
        return ValidateOnBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnBlurBindingBehavior = ValidateOnBlurBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element is changed by the user, causing a change
     * to the model.
     */
    var ValidateOnChangeBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeBindingBehavior, _super);
        function ValidateOnChangeBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateOnChangeBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.change;
        };
        return ValidateOnChangeBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnChangeBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnChangeBindingBehavior = ValidateOnChangeBindingBehavior;
    /**
     * Binding behavior. Indicates the bound property should be validated
     * when the associated element blurs or is changed by the user, causing
     * a change to the model.
     */
    var ValidateOnChangeOrBlurBindingBehavior = (function (_super) {
        __extends(ValidateOnChangeOrBlurBindingBehavior, _super);
        function ValidateOnChangeOrBlurBindingBehavior() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ValidateOnChangeOrBlurBindingBehavior.prototype.getValidateTrigger = function () {
            return validate_trigger_1.validateTrigger.changeOrBlur;
        };
        return ValidateOnChangeOrBlurBindingBehavior;
    }(validate_binding_behavior_base_1.ValidateBindingBehaviorBase));
    ValidateOnChangeOrBlurBindingBehavior.inject = [aurelia_task_queue_1.TaskQueue];
    exports.ValidateOnChangeOrBlurBindingBehavior = ValidateOnChangeOrBlurBindingBehavior;
});

define('aurelia-validation/validate-trigger',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Validation triggers.
     */
    var validateTrigger;
    (function (validateTrigger) {
        /**
         * Manual validation.  Use the controller's `validate()` and  `reset()` methods
         * to validate all bindings.
         */
        validateTrigger[validateTrigger["manual"] = 0] = "manual";
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event.
         */
        validateTrigger[validateTrigger["blur"] = 1] = "blur";
        /**
         * Validate the binding when it updates the model due to a change in the view.
         */
        validateTrigger[validateTrigger["change"] = 2] = "change";
        /**
         * Validate the binding when the binding's target element fires a DOM "blur" event and
         * when it updates the model due to a change in the view.
         */
        validateTrigger[validateTrigger["changeOrBlur"] = 3] = "changeOrBlur";
    })(validateTrigger = exports.validateTrigger || (exports.validateTrigger = {}));
    ;
});

define('aurelia-validation/validate-binding-behavior-base',["require", "exports", "aurelia-dependency-injection", "./validation-controller", "./validate-trigger", "./get-target-dom-element"], function (require, exports, aurelia_dependency_injection_1, validation_controller_1, validate_trigger_1, get_target_dom_element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Binding behavior. Indicates the bound property should be validated.
     */
    var ValidateBindingBehaviorBase = (function () {
        function ValidateBindingBehaviorBase(taskQueue) {
            this.taskQueue = taskQueue;
        }
        ValidateBindingBehaviorBase.prototype.bind = function (binding, source, rulesOrController, rules) {
            var _this = this;
            // identify the target element.
            var target = get_target_dom_element_1.getTargetDOMElement(binding, source);
            // locate the controller.
            var controller;
            if (rulesOrController instanceof validation_controller_1.ValidationController) {
                controller = rulesOrController;
            }
            else {
                controller = source.container.get(aurelia_dependency_injection_1.Optional.of(validation_controller_1.ValidationController));
                rules = rulesOrController;
            }
            if (controller === null) {
                throw new Error("A ValidationController has not been registered.");
            }
            controller.registerBinding(binding, target, rules);
            binding.validationController = controller;
            var trigger = this.getValidateTrigger(controller);
            // tslint:disable-next-line:no-bitwise
            if (trigger & validate_trigger_1.validateTrigger.change) {
                binding.standardUpdateSource = binding.updateSource;
                // tslint:disable-next-line:only-arrow-functions
                binding.updateSource = function (value) {
                    this.standardUpdateSource(value);
                    this.validationController.validateBinding(this);
                };
            }
            // tslint:disable-next-line:no-bitwise
            if (trigger & validate_trigger_1.validateTrigger.blur) {
                binding.validateBlurHandler = function () {
                    _this.taskQueue.queueMicroTask(function () { return controller.validateBinding(binding); });
                };
                binding.validateTarget = target;
                target.addEventListener('blur', binding.validateBlurHandler);
            }
            if (trigger !== validate_trigger_1.validateTrigger.manual) {
                binding.standardUpdateTarget = binding.updateTarget;
                // tslint:disable-next-line:only-arrow-functions
                binding.updateTarget = function (value) {
                    this.standardUpdateTarget(value);
                    this.validationController.resetBinding(this);
                };
            }
        };
        ValidateBindingBehaviorBase.prototype.unbind = function (binding) {
            // reset the binding to it's original state.
            if (binding.standardUpdateSource) {
                binding.updateSource = binding.standardUpdateSource;
                binding.standardUpdateSource = null;
            }
            if (binding.standardUpdateTarget) {
                binding.updateTarget = binding.standardUpdateTarget;
                binding.standardUpdateTarget = null;
            }
            if (binding.validateBlurHandler) {
                binding.validateTarget.removeEventListener('blur', binding.validateBlurHandler);
                binding.validateBlurHandler = null;
                binding.validateTarget = null;
            }
            binding.validationController.unregisterBinding(binding);
            binding.validationController = null;
        };
        return ValidateBindingBehaviorBase;
    }());
    exports.ValidateBindingBehaviorBase = ValidateBindingBehaviorBase;
});

define('aurelia-validation/validation-controller',["require", "exports", "./validator", "./validate-trigger", "./property-info", "./validate-result"], function (require, exports, validator_1, validate_trigger_1, property_info_1, validate_result_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Orchestrates validation.
     * Manages a set of bindings, renderers and objects.
     * Exposes the current list of validation results for binding purposes.
     */
    var ValidationController = (function () {
        function ValidationController(validator) {
            this.validator = validator;
            // Registered bindings (via the validate binding behavior)
            this.bindings = new Map();
            // Renderers that have been added to the controller instance.
            this.renderers = [];
            /**
             * Validation results that have been rendered by the controller.
             */
            this.results = [];
            /**
             * Validation errors that have been rendered by the controller.
             */
            this.errors = [];
            /**
             *  Whether the controller is currently validating.
             */
            this.validating = false;
            // Elements related to validation results that have been rendered.
            this.elements = new Map();
            // Objects that have been added to the controller instance (entity-style validation).
            this.objects = new Map();
            /**
             * The trigger that will invoke automatic validation of a property used in a binding.
             */
            this.validateTrigger = validate_trigger_1.validateTrigger.blur;
            // Promise that resolves when validation has completed.
            this.finishValidating = Promise.resolve();
        }
        /**
         * Adds an object to the set of objects that should be validated when validate is called.
         * @param object The object.
         * @param rules Optional. The rules. If rules aren't supplied the Validator implementation will lookup the rules.
         */
        ValidationController.prototype.addObject = function (object, rules) {
            this.objects.set(object, rules);
        };
        /**
         * Removes an object from the set of objects that should be validated when validate is called.
         * @param object The object.
         */
        ValidationController.prototype.removeObject = function (object) {
            this.objects.delete(object);
            this.processResultDelta('reset', this.results.filter(function (result) { return result.object === object; }), []);
        };
        /**
         * Adds and renders an error.
         */
        ValidationController.prototype.addError = function (message, object, propertyName) {
            if (propertyName === void 0) { propertyName = null; }
            var result = new validate_result_1.ValidateResult({}, object, propertyName, false, message);
            this.processResultDelta('validate', [], [result]);
            return result;
        };
        /**
         * Removes and unrenders an error.
         */
        ValidationController.prototype.removeError = function (result) {
            if (this.results.indexOf(result) !== -1) {
                this.processResultDelta('reset', [result], []);
            }
        };
        /**
         * Adds a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.addRenderer = function (renderer) {
            var _this = this;
            this.renderers.push(renderer);
            renderer.render({
                kind: 'validate',
                render: this.results.map(function (result) { return ({ result: result, elements: _this.elements.get(result) }); }),
                unrender: []
            });
        };
        /**
         * Removes a renderer.
         * @param renderer The renderer.
         */
        ValidationController.prototype.removeRenderer = function (renderer) {
            var _this = this;
            this.renderers.splice(this.renderers.indexOf(renderer), 1);
            renderer.render({
                kind: 'reset',
                render: [],
                unrender: this.results.map(function (result) { return ({ result: result, elements: _this.elements.get(result) }); })
            });
        };
        /**
         * Registers a binding with the controller.
         * @param binding The binding instance.
         * @param target The DOM element.
         * @param rules (optional) rules associated with the binding. Validator implementation specific.
         */
        ValidationController.prototype.registerBinding = function (binding, target, rules) {
            this.bindings.set(binding, { target: target, rules: rules, propertyInfo: null });
        };
        /**
         * Unregisters a binding with the controller.
         * @param binding The binding instance.
         */
        ValidationController.prototype.unregisterBinding = function (binding) {
            this.resetBinding(binding);
            this.bindings.delete(binding);
        };
        /**
         * Interprets the instruction and returns a predicate that will identify
         * relevant results in the list of rendered validation results.
         */
        ValidationController.prototype.getInstructionPredicate = function (instruction) {
            var _this = this;
            if (instruction) {
                var object_1 = instruction.object, propertyName_1 = instruction.propertyName, rules_1 = instruction.rules;
                var predicate_1;
                if (instruction.propertyName) {
                    predicate_1 = function (x) { return x.object === object_1 && x.propertyName === propertyName_1; };
                }
                else {
                    predicate_1 = function (x) { return x.object === object_1; };
                }
                if (rules_1) {
                    return function (x) { return predicate_1(x) && _this.validator.ruleExists(rules_1, x.rule); };
                }
                return predicate_1;
            }
            else {
                return function () { return true; };
            }
        };
        /**
         * Validates and renders results.
         * @param instruction Optional. Instructions on what to validate. If undefined, all
         * objects and bindings will be validated.
         */
        ValidationController.prototype.validate = function (instruction) {
            var _this = this;
            // Get a function that will process the validation instruction.
            var execute;
            if (instruction) {
                // tslint:disable-next-line:prefer-const
                var object_2 = instruction.object, propertyName_2 = instruction.propertyName, rules_2 = instruction.rules;
                // if rules were not specified, check the object map.
                rules_2 = rules_2 || this.objects.get(object_2);
                // property specified?
                if (instruction.propertyName === undefined) {
                    // validate the specified object.
                    execute = function () { return _this.validator.validateObject(object_2, rules_2); };
                }
                else {
                    // validate the specified property.
                    execute = function () { return _this.validator.validateProperty(object_2, propertyName_2, rules_2); };
                }
            }
            else {
                // validate all objects and bindings.
                execute = function () {
                    var promises = [];
                    for (var _i = 0, _a = Array.from(_this.objects); _i < _a.length; _i++) {
                        var _b = _a[_i], object = _b[0], rules = _b[1];
                        promises.push(_this.validator.validateObject(object, rules));
                    }
                    for (var _c = 0, _d = Array.from(_this.bindings); _c < _d.length; _c++) {
                        var _e = _d[_c], binding = _e[0], rules = _e[1].rules;
                        var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                        if (!propertyInfo || _this.objects.has(propertyInfo.object)) {
                            continue;
                        }
                        promises.push(_this.validator.validateProperty(propertyInfo.object, propertyInfo.propertyName, rules));
                    }
                    return Promise.all(promises).then(function (resultSets) { return resultSets.reduce(function (a, b) { return a.concat(b); }, []); });
                };
            }
            // Wait for any existing validation to finish, execute the instruction, render the results.
            this.validating = true;
            var returnPromise = this.finishValidating
                .then(execute)
                .then(function (newResults) {
                var predicate = _this.getInstructionPredicate(instruction);
                var oldResults = _this.results.filter(predicate);
                _this.processResultDelta('validate', oldResults, newResults);
                if (returnPromise === _this.finishValidating) {
                    _this.validating = false;
                }
                var result = {
                    instruction: instruction,
                    valid: newResults.find(function (x) { return !x.valid; }) === undefined,
                    results: newResults
                };
                return result;
            })
                .catch(function (exception) {
                // recover, to enable subsequent calls to validate()
                _this.validating = false;
                _this.finishValidating = Promise.resolve();
                return Promise.reject(exception);
            });
            this.finishValidating = returnPromise;
            return returnPromise;
        };
        /**
         * Resets any rendered validation results (unrenders).
         * @param instruction Optional. Instructions on what to reset. If unspecified all rendered results
         * will be unrendered.
         */
        ValidationController.prototype.reset = function (instruction) {
            var predicate = this.getInstructionPredicate(instruction);
            var oldResults = this.results.filter(predicate);
            this.processResultDelta('reset', oldResults, []);
        };
        /**
         * Gets the elements associated with an object and propertyName (if any).
         */
        ValidationController.prototype.getAssociatedElements = function (_a) {
            var object = _a.object, propertyName = _a.propertyName;
            var elements = [];
            for (var _i = 0, _b = Array.from(this.bindings); _i < _b.length; _i++) {
                var _c = _b[_i], binding = _c[0], target = _c[1].target;
                var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
                if (propertyInfo && propertyInfo.object === object && propertyInfo.propertyName === propertyName) {
                    elements.push(target);
                }
            }
            return elements;
        };
        ValidationController.prototype.processResultDelta = function (kind, oldResults, newResults) {
            // prepare the instruction.
            var instruction = {
                kind: kind,
                render: [],
                unrender: []
            };
            // create a shallow copy of newResults so we can mutate it without causing side-effects.
            newResults = newResults.slice(0);
            var _loop_1 = function (oldResult) {
                // get the elements associated with the old result.
                var elements = this_1.elements.get(oldResult);
                // remove the old result from the element map.
                this_1.elements.delete(oldResult);
                // create the unrender instruction.
                instruction.unrender.push({ result: oldResult, elements: elements });
                // determine if there's a corresponding new result for the old result we are unrendering.
                var newResultIndex = newResults.findIndex(function (x) { return x.rule === oldResult.rule && x.object === oldResult.object && x.propertyName === oldResult.propertyName; });
                if (newResultIndex === -1) {
                    // no corresponding new result... simple remove.
                    this_1.results.splice(this_1.results.indexOf(oldResult), 1);
                    if (!oldResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1);
                    }
                }
                else {
                    // there is a corresponding new result...
                    var newResult = newResults.splice(newResultIndex, 1)[0];
                    // get the elements that are associated with the new result.
                    var elements_1 = this_1.getAssociatedElements(newResult);
                    this_1.elements.set(newResult, elements_1);
                    // create a render instruction for the new result.
                    instruction.render.push({ result: newResult, elements: elements_1 });
                    // do an in-place replacement of the old result with the new result.
                    // this ensures any repeats bound to this.results will not thrash.
                    this_1.results.splice(this_1.results.indexOf(oldResult), 1, newResult);
                    if (!oldResult.valid && newResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1);
                    }
                    else if (!oldResult.valid && !newResult.valid) {
                        this_1.errors.splice(this_1.errors.indexOf(oldResult), 1, newResult);
                    }
                    else if (!newResult.valid) {
                        this_1.errors.push(newResult);
                    }
                }
            };
            var this_1 = this;
            // create unrender instructions from the old results.
            for (var _i = 0, oldResults_1 = oldResults; _i < oldResults_1.length; _i++) {
                var oldResult = oldResults_1[_i];
                _loop_1(oldResult);
            }
            // create render instructions from the remaining new results.
            for (var _a = 0, newResults_1 = newResults; _a < newResults_1.length; _a++) {
                var result = newResults_1[_a];
                var elements = this.getAssociatedElements(result);
                instruction.render.push({ result: result, elements: elements });
                this.elements.set(result, elements);
                this.results.push(result);
                if (!result.valid) {
                    this.errors.push(result);
                }
            }
            // render.
            for (var _b = 0, _c = this.renderers; _b < _c.length; _b++) {
                var renderer = _c[_b];
                renderer.render(instruction);
            }
        };
        /**
         * Validates the property associated with a binding.
         */
        ValidationController.prototype.validateBinding = function (binding) {
            if (!binding.isBound) {
                return;
            }
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            var rules;
            var registeredBinding = this.bindings.get(binding);
            if (registeredBinding) {
                rules = registeredBinding.rules;
                registeredBinding.propertyInfo = propertyInfo;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.validate({ object: object, propertyName: propertyName, rules: rules });
        };
        /**
         * Resets the results for a property associated with a binding.
         */
        ValidationController.prototype.resetBinding = function (binding) {
            var registeredBinding = this.bindings.get(binding);
            var propertyInfo = property_info_1.getPropertyInfo(binding.sourceExpression, binding.source);
            if (!propertyInfo && registeredBinding) {
                propertyInfo = registeredBinding.propertyInfo;
            }
            if (registeredBinding) {
                registeredBinding.propertyInfo = null;
            }
            if (!propertyInfo) {
                return;
            }
            var object = propertyInfo.object, propertyName = propertyInfo.propertyName;
            this.reset({ object: object, propertyName: propertyName });
        };
        return ValidationController;
    }());
    ValidationController.inject = [validator_1.Validator];
    exports.ValidationController = ValidationController;
});

define('aurelia-validation/validator',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Validates objects and properties.
     */
    var Validator = (function () {
        function Validator() {
        }
        return Validator;
    }());
    exports.Validator = Validator;
});

define('aurelia-validation/validate-result',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The result of validating an individual validation rule.
     */
    var ValidateResult = (function () {
        /**
         * @param rule The rule associated with the result. Validator implementation specific.
         * @param object The object that was validated.
         * @param propertyName The name of the property that was validated.
         * @param error The error, if the result is a validation error.
         */
        function ValidateResult(rule, object, propertyName, valid, message) {
            if (message === void 0) { message = null; }
            this.rule = rule;
            this.object = object;
            this.propertyName = propertyName;
            this.valid = valid;
            this.message = message;
            this.id = ValidateResult.nextId++;
        }
        ValidateResult.prototype.toString = function () {
            return this.valid ? 'Valid.' : this.message;
        };
        return ValidateResult;
    }());
    ValidateResult.nextId = 0;
    exports.ValidateResult = ValidateResult;
});

define('aurelia-validation/validation-controller-factory',["require", "exports", "./validation-controller", "./validator"], function (require, exports, validation_controller_1, validator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Creates ValidationController instances.
     */
    var ValidationControllerFactory = (function () {
        function ValidationControllerFactory(container) {
            this.container = container;
        }
        ValidationControllerFactory.get = function (container) {
            return new ValidationControllerFactory(container);
        };
        /**
         * Creates a new controller instance.
         */
        ValidationControllerFactory.prototype.create = function (validator) {
            if (!validator) {
                validator = this.container.get(validator_1.Validator);
            }
            return new validation_controller_1.ValidationController(validator);
        };
        /**
         * Creates a new controller and registers it in the current element's container so that it's
         * available to the validate binding behavior and renderers.
         */
        ValidationControllerFactory.prototype.createForCurrentScope = function (validator) {
            var controller = this.create(validator);
            this.container.registerInstance(validation_controller_1.ValidationController, controller);
            return controller;
        };
        return ValidationControllerFactory;
    }());
    exports.ValidationControllerFactory = ValidationControllerFactory;
    ValidationControllerFactory['protocol:aurelia:resolver'] = true;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-validation/validation-errors-custom-attribute',["require", "exports", "aurelia-binding", "aurelia-dependency-injection", "aurelia-templating", "./validation-controller", "aurelia-pal"], function (require, exports, aurelia_binding_1, aurelia_dependency_injection_1, aurelia_templating_1, validation_controller_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationErrorsCustomAttribute = (function () {
        function ValidationErrorsCustomAttribute(boundaryElement, controllerAccessor) {
            this.boundaryElement = boundaryElement;
            this.controllerAccessor = controllerAccessor;
            this.controller = null;
            this.errors = [];
            this.errorsInternal = [];
        }
        ValidationErrorsCustomAttribute.prototype.sort = function () {
            this.errorsInternal.sort(function (a, b) {
                if (a.targets[0] === b.targets[0]) {
                    return 0;
                }
                // tslint:disable-next-line:no-bitwise
                return a.targets[0].compareDocumentPosition(b.targets[0]) & 2 ? 1 : -1;
            });
        };
        ValidationErrorsCustomAttribute.prototype.interestingElements = function (elements) {
            var _this = this;
            return elements.filter(function (e) { return _this.boundaryElement.contains(e); });
        };
        ValidationErrorsCustomAttribute.prototype.render = function (instruction) {
            var _loop_1 = function (result) {
                var index = this_1.errorsInternal.findIndex(function (x) { return x.error === result; });
                if (index !== -1) {
                    this_1.errorsInternal.splice(index, 1);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var result = _a[_i].result;
                _loop_1(result);
            }
            for (var _b = 0, _c = instruction.render; _b < _c.length; _b++) {
                var _d = _c[_b], result = _d.result, elements = _d.elements;
                if (result.valid) {
                    continue;
                }
                var targets = this.interestingElements(elements);
                if (targets.length) {
                    this.errorsInternal.push({ error: result, targets: targets });
                }
            }
            this.sort();
            this.errors = this.errorsInternal;
        };
        ValidationErrorsCustomAttribute.prototype.bind = function () {
            if (!this.controller) {
                this.controller = this.controllerAccessor();
            }
            // this will call render() with the side-effect of updating this.errors
            this.controller.addRenderer(this);
        };
        ValidationErrorsCustomAttribute.prototype.unbind = function () {
            if (this.controller) {
                this.controller.removeRenderer(this);
            }
        };
        return ValidationErrorsCustomAttribute;
    }());
    ValidationErrorsCustomAttribute.inject = [aurelia_pal_1.DOM.Element, aurelia_dependency_injection_1.Lazy.of(validation_controller_1.ValidationController)];
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.oneWay })
    ], ValidationErrorsCustomAttribute.prototype, "controller", void 0);
    __decorate([
        aurelia_templating_1.bindable({ primaryProperty: true, defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], ValidationErrorsCustomAttribute.prototype, "errors", void 0);
    ValidationErrorsCustomAttribute = __decorate([
        aurelia_templating_1.customAttribute('validation-errors')
    ], ValidationErrorsCustomAttribute);
    exports.ValidationErrorsCustomAttribute = ValidationErrorsCustomAttribute;
});

define('aurelia-validation/validation-renderer-custom-attribute',["require", "exports", "./validation-controller"], function (require, exports, validation_controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationRendererCustomAttribute = (function () {
        function ValidationRendererCustomAttribute() {
        }
        ValidationRendererCustomAttribute.prototype.created = function (view) {
            this.container = view.container;
        };
        ValidationRendererCustomAttribute.prototype.bind = function () {
            this.controller = this.container.get(validation_controller_1.ValidationController);
            this.renderer = this.container.get(this.value);
            this.controller.addRenderer(this.renderer);
        };
        ValidationRendererCustomAttribute.prototype.unbind = function () {
            this.controller.removeRenderer(this.renderer);
            this.controller = null;
            this.renderer = null;
        };
        return ValidationRendererCustomAttribute;
    }());
    exports.ValidationRendererCustomAttribute = ValidationRendererCustomAttribute;
});

define('aurelia-validation/implementation/rules',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Sets, unsets and retrieves rules on an object or constructor function.
     */
    var Rules = (function () {
        function Rules() {
        }
        /**
         * Applies the rules to a target.
         */
        Rules.set = function (target, rules) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            Object.defineProperty(target, Rules.key, { enumerable: false, configurable: false, writable: true, value: rules });
        };
        /**
         * Removes rules from a target.
         */
        Rules.unset = function (target) {
            if (target instanceof Function) {
                target = target.prototype;
            }
            target[Rules.key] = null;
        };
        /**
         * Retrieves the target's rules.
         */
        Rules.get = function (target) {
            return target[Rules.key] || null;
        };
        return Rules;
    }());
    /**
     * The name of the property that stores the rules.
     */
    Rules.key = '__rules__';
    exports.Rules = Rules;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('aurelia-validation/implementation/standard-validator',["require", "exports", "aurelia-templating", "../validator", "../validate-result", "./rules", "./validation-messages"], function (require, exports, aurelia_templating_1, validator_1, validate_result_1, rules_1, validation_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Validates.
     * Responsible for validating objects and properties.
     */
    var StandardValidator = (function (_super) {
        __extends(StandardValidator, _super);
        function StandardValidator(messageProvider, resources) {
            var _this = _super.call(this) || this;
            _this.messageProvider = messageProvider;
            _this.lookupFunctions = resources.lookupFunctions;
            _this.getDisplayName = messageProvider.getDisplayName.bind(messageProvider);
            return _this;
        }
        /**
         * Validates the specified property.
         * @param object The object to validate.
         * @param propertyName The name of the property to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateProperty = function (object, propertyName, rules) {
            return this.validate(object, propertyName, rules || null);
        };
        /**
         * Validates all rules for specified object and it's properties.
         * @param object The object to validate.
         * @param rules Optional. If unspecified, the rules will be looked up using the metadata
         * for the object created by ValidationRules....on(class/object)
         */
        StandardValidator.prototype.validateObject = function (object, rules) {
            return this.validate(object, null, rules || null);
        };
        /**
         * Determines whether a rule exists in a set of rules.
         * @param rules The rules to search.
         * @parem rule The rule to find.
         */
        StandardValidator.prototype.ruleExists = function (rules, rule) {
            var i = rules.length;
            while (i--) {
                if (rules[i].indexOf(rule) !== -1) {
                    return true;
                }
            }
            return false;
        };
        StandardValidator.prototype.getMessage = function (rule, object, value) {
            var expression = rule.message || this.messageProvider.getMessage(rule.messageKey);
            // tslint:disable-next-line:prefer-const
            var _a = rule.property, propertyName = _a.name, displayName = _a.displayName;
            if (propertyName !== null) {
                displayName = this.messageProvider.getDisplayName(propertyName, displayName);
            }
            var overrideContext = {
                $displayName: displayName,
                $propertyName: propertyName,
                $value: value,
                $object: object,
                $config: rule.config,
                // returns the name of a given property, given just the property name (irrespective of the property's displayName)
                // split on capital letters, first letter ensured to be capitalized
                $getDisplayName: this.getDisplayName
            };
            return expression.evaluate({ bindingContext: object, overrideContext: overrideContext }, this.lookupFunctions);
        };
        StandardValidator.prototype.validateRuleSequence = function (object, propertyName, ruleSequence, sequence, results) {
            var _this = this;
            // are we validating all properties or a single property?
            var validateAllProperties = propertyName === null || propertyName === undefined;
            var rules = ruleSequence[sequence];
            var allValid = true;
            // validate each rule.
            var promises = [];
            var _loop_1 = function (i) {
                var rule = rules[i];
                // is the rule related to the property we're validating.
                if (!validateAllProperties && rule.property.name !== propertyName) {
                    return "continue";
                }
                // is this a conditional rule? is the condition met?
                if (rule.when && !rule.when(object)) {
                    return "continue";
                }
                // validate.
                var value = rule.property.name === null ? object : object[rule.property.name];
                var promiseOrBoolean = rule.condition(value, object);
                if (!(promiseOrBoolean instanceof Promise)) {
                    promiseOrBoolean = Promise.resolve(promiseOrBoolean);
                }
                promises.push(promiseOrBoolean.then(function (valid) {
                    var message = valid ? null : _this.getMessage(rule, object, value);
                    results.push(new validate_result_1.ValidateResult(rule, object, rule.property.name, valid, message));
                    allValid = allValid && valid;
                    return valid;
                }));
            };
            for (var i = 0; i < rules.length; i++) {
                _loop_1(i);
            }
            return Promise.all(promises)
                .then(function () {
                sequence++;
                if (allValid && sequence < ruleSequence.length) {
                    return _this.validateRuleSequence(object, propertyName, ruleSequence, sequence, results);
                }
                return results;
            });
        };
        StandardValidator.prototype.validate = function (object, propertyName, rules) {
            // rules specified?
            if (!rules) {
                // no. attempt to locate the rules.
                rules = rules_1.Rules.get(object);
            }
            // any rules?
            if (!rules) {
                return Promise.resolve([]);
            }
            return this.validateRuleSequence(object, propertyName, rules, 0, []);
        };
        return StandardValidator;
    }(validator_1.Validator));
    StandardValidator.inject = [validation_messages_1.ValidationMessageProvider, aurelia_templating_1.ViewResources];
    exports.StandardValidator = StandardValidator;
});

define('aurelia-validation/implementation/validation-messages',["require", "exports", "./validation-parser"], function (require, exports, validation_parser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Dictionary of validation messages. [messageKey]: messageExpression
     */
    exports.validationMessages = {
        /**
         * The default validation message. Used with rules that have no standard message.
         */
        default: "${$displayName} is invalid.",
        required: "${$displayName} is required.",
        matches: "${$displayName} is not correctly formatted.",
        email: "${$displayName} is not a valid email.",
        minLength: "${$displayName} must be at least ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        maxLength: "${$displayName} cannot be longer than ${$config.length} character${$config.length === 1 ? '' : 's'}.",
        minItems: "${$displayName} must contain at least ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        maxItems: "${$displayName} cannot contain more than ${$config.count} item${$config.count === 1 ? '' : 's'}.",
        equals: "${$displayName} must be ${$config.expectedValue}.",
    };
    /**
     * Retrieves validation messages and property display names.
     */
    var ValidationMessageProvider = (function () {
        function ValidationMessageProvider(parser) {
            this.parser = parser;
        }
        /**
         * Returns a message binding expression that corresponds to the key.
         * @param key The message key.
         */
        ValidationMessageProvider.prototype.getMessage = function (key) {
            var message;
            if (key in exports.validationMessages) {
                message = exports.validationMessages[key];
            }
            else {
                message = exports.validationMessages['default'];
            }
            return this.parser.parseMessage(message);
        };
        /**
         * Formulates a property display name using the property name and the configured
         * displayName (if provided).
         * Override this with your own custom logic.
         * @param propertyName The property name.
         */
        ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
            if (displayName !== null && displayName !== undefined) {
                return (displayName instanceof Function) ? displayName() : displayName;
            }
            // split on upper-case letters.
            var words = propertyName.split(/(?=[A-Z])/).join(' ');
            // capitalize first letter.
            return words.charAt(0).toUpperCase() + words.slice(1);
        };
        return ValidationMessageProvider;
    }());
    ValidationMessageProvider.inject = [validation_parser_1.ValidationParser];
    exports.ValidationMessageProvider = ValidationMessageProvider;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('aurelia-validation/implementation/validation-parser',["require", "exports", "aurelia-binding", "aurelia-templating", "./util", "aurelia-logging"], function (require, exports, aurelia_binding_1, aurelia_templating_1, util_1, LogManager) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationParser = (function () {
        function ValidationParser(parser, bindinqLanguage) {
            this.parser = parser;
            this.bindinqLanguage = bindinqLanguage;
            this.emptyStringExpression = new aurelia_binding_1.LiteralString('');
            this.nullExpression = new aurelia_binding_1.LiteralPrimitive(null);
            this.undefinedExpression = new aurelia_binding_1.LiteralPrimitive(undefined);
            this.cache = {};
        }
        ValidationParser.prototype.parseMessage = function (message) {
            if (this.cache[message] !== undefined) {
                return this.cache[message];
            }
            var parts = this.bindinqLanguage.parseInterpolation(null, message);
            if (parts === null) {
                return new aurelia_binding_1.LiteralString(message);
            }
            var expression = new aurelia_binding_1.LiteralString(parts[0]);
            for (var i = 1; i < parts.length; i += 2) {
                expression = new aurelia_binding_1.Binary('+', expression, new aurelia_binding_1.Binary('+', this.coalesce(parts[i]), new aurelia_binding_1.LiteralString(parts[i + 1])));
            }
            MessageExpressionValidator.validate(expression, message);
            this.cache[message] = expression;
            return expression;
        };
        ValidationParser.prototype.parseProperty = function (property) {
            if (util_1.isString(property)) {
                return { name: property, displayName: null };
            }
            var accessor = this.getAccessorExpression(property.toString());
            if (accessor instanceof aurelia_binding_1.AccessScope
                || accessor instanceof aurelia_binding_1.AccessMember && accessor.object instanceof aurelia_binding_1.AccessScope) {
                return {
                    name: accessor.name,
                    displayName: null
                };
            }
            throw new Error("Invalid subject: \"" + accessor + "\"");
        };
        ValidationParser.prototype.coalesce = function (part) {
            // part === null || part === undefined ? '' : part
            return new aurelia_binding_1.Conditional(new aurelia_binding_1.Binary('||', new aurelia_binding_1.Binary('===', part, this.nullExpression), new aurelia_binding_1.Binary('===', part, this.undefinedExpression)), this.emptyStringExpression, new aurelia_binding_1.CallMember(part, 'toString', []));
        };
        ValidationParser.prototype.getAccessorExpression = function (fn) {
            /* tslint:disable:max-line-length */
            var classic = /^function\s*\([$_\w\d]+\)\s*\{(?:\s*"use strict";)?\s*(?:[$_\w\d.['"\]+;]+)?\s*return\s+[$_\w\d]+\.([$_\w\d]+)\s*;?\s*\}$/;
            /* tslint:enable:max-line-length */
            var arrow = /^\(?[$_\w\d]+\)?\s*=>\s*[$_\w\d]+\.([$_\w\d]+)$/;
            var match = classic.exec(fn) || arrow.exec(fn);
            if (match === null) {
                throw new Error("Unable to parse accessor function:\n" + fn);
            }
            return this.parser.parse(match[1]);
        };
        return ValidationParser;
    }());
    ValidationParser.inject = [aurelia_binding_1.Parser, aurelia_templating_1.BindingLanguage];
    exports.ValidationParser = ValidationParser;
    var MessageExpressionValidator = (function (_super) {
        __extends(MessageExpressionValidator, _super);
        function MessageExpressionValidator(originalMessage) {
            var _this = _super.call(this, []) || this;
            _this.originalMessage = originalMessage;
            return _this;
        }
        MessageExpressionValidator.validate = function (expression, originalMessage) {
            var visitor = new MessageExpressionValidator(originalMessage);
            expression.accept(visitor);
        };
        MessageExpressionValidator.prototype.visitAccessScope = function (access) {
            if (access.ancestor !== 0) {
                throw new Error('$parent is not permitted in validation message expressions.');
            }
            if (['displayName', 'propertyName', 'value', 'object', 'config', 'getDisplayName'].indexOf(access.name) !== -1) {
                LogManager.getLogger('aurelia-validation')
                    .warn("Did you mean to use \"$" + access.name + "\" instead of \"" + access.name + "\" in this validation message template: \"" + this.originalMessage + "\"?");
            }
        };
        return MessageExpressionValidator;
    }(aurelia_binding_1.Unparser));
    exports.MessageExpressionValidator = MessageExpressionValidator;
});

define('aurelia-validation/implementation/util',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isString(value) {
        return Object.prototype.toString.call(value) === '[object String]';
    }
    exports.isString = isString;
});

define('aurelia-validation/implementation/validation-rules',["require", "exports", "./util", "./rules", "./validation-messages"], function (require, exports, util_1, rules_1, validation_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Part of the fluent rule API. Enables customizing property rules.
     */
    var FluentRuleCustomizer = (function () {
        function FluentRuleCustomizer(property, condition, config, fluentEnsure, fluentRules, parser) {
            if (config === void 0) { config = {}; }
            this.fluentEnsure = fluentEnsure;
            this.fluentRules = fluentRules;
            this.parser = parser;
            this.rule = {
                property: property,
                condition: condition,
                config: config,
                when: null,
                messageKey: 'default',
                message: null,
                sequence: fluentRules.sequence
            };
            this.fluentEnsure._addRule(this.rule);
        }
        /**
         * Validate subsequent rules after previously declared rules have
         * been validated successfully. Use to postpone validation of costly
         * rules until less expensive rules pass validation.
         */
        FluentRuleCustomizer.prototype.then = function () {
            this.fluentRules.sequence++;
            return this;
        };
        /**
         * Specifies the key to use when looking up the rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessageKey = function (key) {
            this.rule.messageKey = key;
            this.rule.message = null;
            return this;
        };
        /**
         * Specifies rule's validation message.
         */
        FluentRuleCustomizer.prototype.withMessage = function (message) {
            this.rule.messageKey = 'custom';
            this.rule.message = this.parser.parseMessage(message);
            return this;
        };
        /**
         * Specifies a condition that must be met before attempting to validate the rule.
         * @param condition A function that accepts the object as a parameter and returns true
         * or false whether the rule should be evaluated.
         */
        FluentRuleCustomizer.prototype.when = function (condition) {
            this.rule.when = condition;
            return this;
        };
        /**
         * Tags the rule instance, enabling the rule to be found easily
         * using ValidationRules.taggedRules(rules, tag)
         */
        FluentRuleCustomizer.prototype.tag = function (tag) {
            this.rule.tag = tag;
            return this;
        };
        ///// FluentEnsure APIs /////
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        FluentRuleCustomizer.prototype.ensure = function (subject) {
            return this.fluentEnsure.ensure(subject);
        };
        /**
         * Targets an object with validation rules.
         */
        FluentRuleCustomizer.prototype.ensureObject = function () {
            return this.fluentEnsure.ensureObject();
        };
        Object.defineProperty(FluentRuleCustomizer.prototype, "rules", {
            /**
             * Rules that have been defined using the fluent API.
             */
            get: function () {
                return this.fluentEnsure.rules;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentRuleCustomizer.prototype.on = function (target) {
            return this.fluentEnsure.on(target);
        };
        ///////// FluentRules APIs /////////
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRuleCustomizer.prototype.satisfies = function (condition, config) {
            return this.fluentRules.satisfies(condition, config);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRuleCustomizer.prototype.satisfiesRule = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.fluentRules).satisfiesRule.apply(_a, [name].concat(args));
            var _a;
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRuleCustomizer.prototype.required = function () {
            return this.fluentRules.required();
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.matches = function (regex) {
            return this.fluentRules.matches(regex);
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.email = function () {
            return this.fluentRules.email();
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.minLength = function (length) {
            return this.fluentRules.minLength(length);
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxLength = function (length) {
            return this.fluentRules.maxLength(length);
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.minItems = function (count) {
            return this.fluentRules.minItems(count);
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRuleCustomizer.prototype.maxItems = function (count) {
            return this.fluentRules.maxItems(count);
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRuleCustomizer.prototype.equals = function (expectedValue) {
            return this.fluentRules.equals(expectedValue);
        };
        return FluentRuleCustomizer;
    }());
    exports.FluentRuleCustomizer = FluentRuleCustomizer;
    /**
     * Part of the fluent rule API. Enables applying rules to properties and objects.
     */
    var FluentRules = (function () {
        function FluentRules(fluentEnsure, parser, property) {
            this.fluentEnsure = fluentEnsure;
            this.parser = parser;
            this.property = property;
            /**
             * Current rule sequence number. Used to postpone evaluation of rules until rules
             * with lower sequence number have successfully validated. The "then" fluent API method
             * manages this property, there's usually no need to set it directly.
             */
            this.sequence = 0;
        }
        /**
         * Sets the display name of the ensured property.
         */
        FluentRules.prototype.displayName = function (name) {
            this.property.displayName = name;
            return this;
        };
        /**
         * Applies an ad-hoc rule function to the ensured property or object.
         * @param condition The function to validate the rule.
         * Will be called with two arguments, the property value and the object.
         * Should return a boolean or a Promise that resolves to a boolean.
         */
        FluentRules.prototype.satisfies = function (condition, config) {
            return new FluentRuleCustomizer(this.property, condition, config, this.fluentEnsure, this, this.parser);
        };
        /**
         * Applies a rule by name.
         * @param name The name of the custom or standard rule.
         * @param args The rule's arguments.
         */
        FluentRules.prototype.satisfiesRule = function (name) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var rule = FluentRules.customRules[name];
            if (!rule) {
                // standard rule?
                rule = this[name];
                if (rule instanceof Function) {
                    return rule.call.apply(rule, [this].concat(args));
                }
                throw new Error("Rule with name \"" + name + "\" does not exist.");
            }
            var config = rule.argsToConfig ? rule.argsToConfig.apply(rule, args) : undefined;
            return this.satisfies(function (value, obj) {
                return (_a = rule.condition).call.apply(_a, [_this, value, obj].concat(args));
                var _a;
            }, config)
                .withMessageKey(name);
        };
        /**
         * Applies the "required" rule to the property.
         * The value cannot be null, undefined or whitespace.
         */
        FluentRules.prototype.required = function () {
            return this.satisfies(function (value) {
                return value !== null
                    && value !== undefined
                    && !(util_1.isString(value) && !/\S/.test(value));
            }).withMessageKey('required');
        };
        /**
         * Applies the "matches" rule to the property.
         * Value must match the specified regular expression.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.matches = function (regex) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || regex.test(value); })
                .withMessageKey('matches');
        };
        /**
         * Applies the "email" rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.email = function () {
            // regex from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            /* tslint:disable:max-line-length */
            return this.matches(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
                .withMessageKey('email');
        };
        /**
         * Applies the "minLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.minLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length >= length; }, { length: length })
                .withMessageKey('minLength');
        };
        /**
         * Applies the "maxLength" STRING validation rule to the property.
         * null, undefined and empty-string values are considered valid.
         */
        FluentRules.prototype.maxLength = function (length) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length === 0 || value.length <= length; }, { length: length })
                .withMessageKey('maxLength');
        };
        /**
         * Applies the "minItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.minItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length >= count; }, { count: count })
                .withMessageKey('minItems');
        };
        /**
         * Applies the "maxItems" ARRAY validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.maxItems = function (count) {
            return this.satisfies(function (value) { return value === null || value === undefined || value.length <= count; }, { count: count })
                .withMessageKey('maxItems');
        };
        /**
         * Applies the "equals" validation rule to the property.
         * null and undefined values are considered valid.
         */
        FluentRules.prototype.equals = function (expectedValue) {
            return this.satisfies(function (value) { return value === null || value === undefined || value === '' || value === expectedValue; }, { expectedValue: expectedValue })
                .withMessageKey('equals');
        };
        return FluentRules;
    }());
    FluentRules.customRules = {};
    exports.FluentRules = FluentRules;
    /**
     * Part of the fluent rule API. Enables targeting properties and objects with rules.
     */
    var FluentEnsure = (function () {
        function FluentEnsure(parser) {
            this.parser = parser;
            /**
             * Rules that have been defined using the fluent API.
             */
            this.rules = [];
        }
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor
         * function.
         */
        FluentEnsure.prototype.ensure = function (property) {
            this.assertInitialized();
            return new FluentRules(this, this.parser, this.parser.parseProperty(property));
        };
        /**
         * Targets an object with validation rules.
         */
        FluentEnsure.prototype.ensureObject = function () {
            this.assertInitialized();
            return new FluentRules(this, this.parser, { name: null, displayName: null });
        };
        /**
         * Applies the rules to a class or object, making them discoverable by the StandardValidator.
         * @param target A class or object.
         */
        FluentEnsure.prototype.on = function (target) {
            rules_1.Rules.set(target, this.rules);
            return this;
        };
        /**
         * Adds a rule definition to the sequenced ruleset.
         * @internal
         */
        FluentEnsure.prototype._addRule = function (rule) {
            while (this.rules.length < rule.sequence + 1) {
                this.rules.push([]);
            }
            this.rules[rule.sequence].push(rule);
        };
        FluentEnsure.prototype.assertInitialized = function () {
            if (this.parser) {
                return;
            }
            throw new Error("Did you forget to add \".plugin('aurelia-validation')\" to your main.js?");
        };
        return FluentEnsure;
    }());
    exports.FluentEnsure = FluentEnsure;
    /**
     * Fluent rule definition API.
     */
    var ValidationRules = (function () {
        function ValidationRules() {
        }
        ValidationRules.initialize = function (parser) {
            ValidationRules.parser = parser;
        };
        /**
         * Target a property with validation rules.
         * @param property The property to target. Can be the property name or a property accessor function.
         */
        ValidationRules.ensure = function (property) {
            return new FluentEnsure(ValidationRules.parser).ensure(property);
        };
        /**
         * Targets an object with validation rules.
         */
        ValidationRules.ensureObject = function () {
            return new FluentEnsure(ValidationRules.parser).ensureObject();
        };
        /**
         * Defines a custom rule.
         * @param name The name of the custom rule. Also serves as the message key.
         * @param condition The rule function.
         * @param message The message expression
         * @param argsToConfig A function that maps the rule's arguments to a "config"
         * object that can be used when evaluating the message expression.
         */
        ValidationRules.customRule = function (name, condition, message, argsToConfig) {
            validation_messages_1.validationMessages[name] = message;
            FluentRules.customRules[name] = { condition: condition, argsToConfig: argsToConfig };
        };
        /**
         * Returns rules with the matching tag.
         * @param rules The rules to search.
         * @param tag The tag to search for.
         */
        ValidationRules.taggedRules = function (rules, tag) {
            return rules.map(function (x) { return x.filter(function (r) { return r.tag === tag; }); });
        };
        /**
         * Removes the rules from a class or object.
         * @param target A class or object.
         */
        ValidationRules.off = function (target) {
            rules_1.Rules.unset(target);
        };
        return ValidationRules;
    }());
    exports.ValidationRules = ValidationRules;
});

define('subforms/instructions-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var InstructionsForm = exports.InstructionsForm = function InstructionsForm() {
		_classCallCheck(this, InstructionsForm);
	};
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=bootstrap/css/bootstrap.css></require><require from=./app.css></require><nav class=\"navbar navbar-default navbar-static-top\" role=navigation><div class=navbar-header><img class=logo src=./images/logo.png></div></nav><div class=container><router-view></router-view></div></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "html {\n  overflow-y: scroll; }\n\nbody {\n  /*\r\n\twhen nav is fixed:\r\n\tmargin-top: $nav-height + 10px;\r\n\t*/\n  margin-bottom: 30px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1.5em;\n  font-weight: 400; }\n  body > nav {\n    height: 100px;\n    background-image: url(/images/bg-repeat.gif);\n    background-repeat: repeat-x;\n    padding-left: 10px;\n    border-bottom: none !important; }\n    body > nav img.logo {\n      height: 100px; }\n  body form label {\n    font-weight: 400 !important; }\n  body form .form-group.required > .control-label:after {\n    content: \"*\";\n    color: red; }\n  body .progress-indicator li:after {\n    content: \"\\0000a0\"; }\n  body .removable-panel, body .damage-panel, body .suspect-panel, body .witness-panel {\n    margin-top: 20px;\n    margin-bottom: 20px; }\n    body .removable-panel .btn-remove, body .damage-panel .btn-remove, body .suspect-panel .btn-remove, body .witness-panel .btn-remove {\n      display: block;\n      float: right; }\n  body .next-prev-footer {\n    margin-top: 50px; }\n  body .begin-footer {\n    margin-top: 200px; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mt-1 {\n  margin-top: 25px !important; }\n\n.mt-2 {\n  margin-top: 50px !important; }\n\n.mt-3 {\n  margin-top: 75px !important; }\n\n.mt-4 {\n  margin-top: 100px !important; }\n\n.mt-5 {\n  margin-top: 125px !important; }\n"; });
define('text!form-submitted.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('text!resources/elements/progress-tracker.css', ['module'], function(module) { module.exports = ".flexer, .progress-indicator {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex; }\n\n.no-flexer {\n  display: block; }\n\n.no-flexer-element {\n  -ms-flex: 0;\n  -webkit-flex: 0;\n  -moz-flex: 0;\n  flex: 0; }\n\n.flexer-element, .progress-indicator > li {\n  -ms-flex: 1;\n  -webkit-flex: 1;\n  -moz-flex: 1;\n  flex: 1; }\n\n.progress-indicator {\n  margin: 0;\n  padding: 0;\n  font-size: 100%;\n  text-transform: uppercase;\n  margin-bottom: 1em; }\n  .progress-indicator > li {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    list-style: none;\n    text-align: center;\n    width: auto;\n    padding: 0;\n    margin: 0;\n    position: relative;\n    text-overflow: ellipsis;\n    color: #bbb;\n    display: block;\n    font-weight: 400; }\n    .progress-indicator > li:hover {\n      color: #888888;\n      cursor: pointer;\n      font-weight: 500; }\n  .progress-indicator > li.new {\n    opacity: 0.5;\n    cursor: default;\n    color: #bbb;\n    font-weight: 100; }\n  .progress-indicator > li.completed {\n    color: #65d074; }\n    .progress-indicator > li.completed .bubble {\n      background-color: #65d074;\n      color: #65d074;\n      border-color: #309f40; }\n      .progress-indicator > li.completed .bubble:before, .progress-indicator > li.completed .bubble:after {\n        background-color: #65d074;\n        border-color: #309f40; }\n    .progress-indicator > li.completed:hover {\n      color: #309f40 !important; }\n  .progress-indicator > li.active {\n    color: #337AB7; }\n    .progress-indicator > li.active .bubble {\n      background-color: #337AB7;\n      color: #337AB7;\n      border-color: #1d4567; }\n      .progress-indicator > li.active .bubble:before, .progress-indicator > li.active .bubble:after {\n        background-color: #337AB7;\n        border-color: #1d4567; }\n    .progress-indicator > li.active:hover {\n      color: #1d4567 !important; }\n  .progress-indicator > li .bubble {\n    border-radius: 1000px;\n    width: 20px;\n    height: 20px;\n    background-color: #bbb;\n    display: block;\n    margin: 0 auto 0.5em auto;\n    border-bottom: 1px solid #888888; }\n  .progress-indicator > li .bubble:before,\n  .progress-indicator > li .bubble:after {\n    display: block;\n    position: absolute;\n    top: 9px;\n    width: 100%;\n    height: 3px;\n    content: '';\n    background-color: #bbb; }\n  .progress-indicator > li .bubble:before {\n    left: 0; }\n  .progress-indicator > li .bubble:after {\n    right: 0; }\n  .progress-indicator > li:first-child .bubble:before,\n  .progress-indicator > li:first-child .bubble:after {\n    width: 50%;\n    margin-left: 50%; }\n  .progress-indicator > li:last-child .bubble:before,\n  .progress-indicator > li:last-child .bubble:after {\n    width: 50%;\n    margin-right: 50%; }\n\n@media handheld, screen and (max-width: 400px) {\n  .progress-indicator {\n    font-size: 60%; } }\n"; });
define('text!report-form.html', ['module'], function(module) { module.exports = "<template><div class=row><progress-tracker pages.bind=pages></progress-tracker></div><div class=row><compose view-model=subforms/${activePage.pageKey} model=report></compose></div><div class=\"row next-prev-footer mt-2\" if.bind=\"!onFirstPage && !onLastPage\"><div class=col-md-6><button type=button class=\"btn btn-secondary btn-lg btn-block\" disabled.bind=!hasPreviousPage click.delegate=previousPage()>Tagasi</button></div><div class=col-md-6><button type=button class=\"btn btn-primary btn-lg btn-block\" disabled.bind=!hasNextPage click.delegate=nextPage()>Edasi</button></div></div><div class=\"row begin-footer mt-5\" if.bind=onFirstPage><div class=\"col-md-6 col-md-offset-3\"><button type=button class=\"btn btn-primary btn-lg btn-block\" click.delegate=nextPage()>Alusta</button></div></div><top-scroller></top-scroller></template>"; });
define('text!resources/elements/top-scroller.css', ['module'], function(module) { module.exports = ".scroll-top-wrapper.show {\n  visibility: visible;\n  cursor: pointer;\n  opacity: 1.0; }\n\n.scroll-top-wrapper {\n  position: fixed;\n  opacity: 0;\n  visibility: hidden;\n  overflow: hidden;\n  text-align: center;\n  z-index: 99999999;\n  background-color: #777777;\n  color: #eeeeee;\n  width: 50px;\n  height: 48px;\n  line-height: 48px;\n  right: 30px;\n  bottom: 30px;\n  padding-top: 2px;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  -webkit-transition: all 0.5s ease-in-out;\n  -moz-transition: all 0.5s ease-in-out;\n  -ms-transition: all 0.5s ease-in-out;\n  -o-transition: all 0.5s ease-in-out;\n  transition: all 0.5s ease-in-out; }\n  .scroll-top-wrapper i.fa {\n    line-height: inherit; }\n  .scroll-top-wrapper:hover {\n    background-color: #888888; }\n"; });
define('text!subforms/damages-form.html', ['module'], function(module) { module.exports = "<template><h2>Varaline kahju</h2><button type=button class=\"btn btn-primary btn-lg btn-block mt-1\">Lisa ära võetud/viidud/saamata jäänud vara</button><div class=\"panel panel-default damage-panel\"><div class=panel-body><form><div class=row><div class=\"col-md-1 pull-right\"><button type=button class=\"btn btn-danger btn-md btn-remove\"><i class=\"fa fa-times\"></i></button></div></div><div class=row><div class=\"form-group col-md-4\"><label class=control-label>Vara nimetus</label><input type=text class=form-control></div><div class=\"form-group col-md-3 col-md-offset-2\"><label class=control-label>Ligikaudne hetkeväärtus (€)</label><input type=number class=form-control></div></div><div class=row><div class=\"form-group col-md-2\"><label class=control-label>Soetamise aasta</label><input type=text class=form-control></div></div><br><div class=row><div class=col-md-6><label class=control-label>Vara viimati olemas</label><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=\"form-group col-md-5\"><label class=control-label>Kuupäev</label><input type=date class=form-control></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Kellaaeg</label><input type=time class=form-control></div></div></div></div></div><div class=\"form-group col-md-6\"><label class=control-label>Vara puudumine avastati</label><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=\"form-group col-md-5\"><label class=control-label>Kuupäev</label><input type=date class=form-control></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Kellaaeg</label><input type=time class=form-control></div></div></div></div></div></div><br><div class=row><div class=\"form-group col-md-8\"><label class=control-label for=eventDescription>Eritunnused ja tundemärgid</label><textarea class=form-control id=eventDescription rows=3></textarea><small class=\"form-text text-muted\">Sealhulgas IMEI kood, seerianumber jms</small></div></div></form></div></div></template>"; });
define('text!subforms/event-form.html', ['module'], function(module) { module.exports = "<template><h2>Sündmus</h2><form class=mt-1><div class=row><div class=\"form-group required col-md-6\"><label class=control-label for=eventDescription>Toimunu kirjeldus</label><textarea class=form-control id=eventDescription rows=6></textarea></div></div><div class=row><div class=\"form-group col-md-2\"><label for=eventDate class=control-label>Kuupäev</label><input type=date class=form-control id=eventDate></div></div><div class=row><div class=\"form-group col-md-2\"><label for=eventTime class=control-label>Kellaaeg</label><input type=time class=form-control id=eventTime></div></div><div class=row><div class=\"form-group col-md-4\"><label for=eventCountry class=control-label>Riik</label><select class=form-control id=eventCountry><option></option></select></div></div><div class=row><div class=\"form-group col-md-5\"><label for=eventAddress class=control-label>Aadress</label><input type=text class=form-control id=eventAddress></div></div><div class=row><div class=\"form-group col-md-4\"><label for=eventLocation class=control-label>Toimumiskoht</label><input type=text class=form-control id=eventLocation><small class=\"form-text text-muted\">Nt internet, park, kauplus</small></div></div></form></template>"; });
define('text!subforms/reporter-contact-form.html', ['module'], function(module) { module.exports = "<template><h2>Teie kontaktandmed</h2><form class=mt-1><div class=row><div class=\"form-group required col-md-3\"><label for=phoneNumber class=control-label>Telefoninumber</label><input type=tel class=form-control id=phoneNumber></div></div><div class=row><div class=\"form-group required col-md-4\"><label for=email class=control-label>E-post</label><input type=tel class=form-control id=email></div></div><div class=row><label class=\"col-form-legend col-md-3\">Eelistatud kontaktmeetod</label><div class=\"form-group col-md-12\"><div class=form-check><label class=form-check-label><input class=form-check-input type=radio name=preferredModeOfContact value=telephone checked> telefon</label></div><div class=form-check><label class=form-check-label><input class=form-check-input type=radio name=preferredModeOfContact value=email> e-mail</label></div></div></div><div class=row><div class=\"form-group col-md-4\"><label for=contactTime class=control-label>Sobiv aeg kontakteerumiseks</label><input type=text class=form-control id=contactTime></div></div><div class=row><div class=\"form-group col-md-5\"><label for=address class=control-label>Aadress</label><input type=text class=form-control id=address><small class=\"form-text text-muted\">Tänav, maja, korter, linn</small></div></div><div class=row><div class=\"form-group col-md-4\"><label for=municipality class=control-label>Maakond</label><select class=form-control id=municipality><option></option></select></div></div></form></template>"; });
define('text!subforms/reporter-form.html', ['module'], function(module) { module.exports = "<template><h2>Teie isikuandmed</h2><form class=mt-1><div class=row><div class=\"form-group required col-md-3\"><label for=firstName class=control-label>Eesnimi</label><input type=text class=form-control id=firstName></div></div><div class=row><div class=\"form-group required col-md-3\"><label for=lastName class=control-label>Perenimi</label><input type=text class=form-control id=lastName></div></div><div class=row><div class=\"form-group required col-md-3\"><label class=control-label>Isikukood ja/või sünnikuupäev</label><div class=\"panel panel-default\"><div class=panel-body><div class=row><div class=\"form-group col-md-12\"><label for=SSN class=control-label>Isikukood</label><input type=text class=form-control id=SSN></div></div><div class=row><div class=\"form-group col-md-9\"><label for=dateOfBirth class=control-label>Sünnikuupäev</label><input type=date class=form-control id=dateOfBirth></div></div></div></div></div></div><div class=row><div class=\"form-group col-md-5\"><label for=nationality class=control-label>Kodakondsus</label><select class=form-control id=nationality><option></option></select></div></div><div class=row><div class=\"form-group col-md-4\"><label for=occupation class=control-label>Amet</label><input type=text class=form-control id=occupation></div></div><div class=row><div class=\"form-check col-md-5\"><label class=form-check-label><input type=checkbox class=\"form-check-input control-label\">&nbsp;&nbsp;Kannatanu on juriidiline isik</label></div></div></form></template>"; });
define('text!subforms/submission-form.html', ['module'], function(module) { module.exports = "<template><h2>Avalduse esitamine</h2><h3>Kokkuvõte esitatavatest andmetest</h3><p>Hetkel puudub</p><h3>Esitamine</h3><form><div class=row><div class=\"form-check col-md-5\"><label class=form-check-label><input type=checkbox class=\"form-check-input control-label\">&nbsp;&nbsp;Olen nõus kokkuleppemenetlusega</label></div></div><div class=row><div class=\"form-check col-md-7\"><label class=form-check-label><input type=checkbox class=\"form-check-input control-label\">&nbsp;&nbsp;Olen nõus, et menetlusega seotud dokumendid esitatakse minu poolt antud e-posti aadressile</label></div></div><div class=row><div class=\"form-check col-md-5\"><label class=form-check-label><input type=checkbox class=\"form-check-input control-label\">&nbsp;&nbsp;Soovin teavet&nbsp;<a target=_blank href=https://www.e-toimik.ee>E-Toimiku</a>&nbsp;kaudu</label></div></div></form></template>"; });
define('text!subforms/suspects-form.html', ['module'], function(module) { module.exports = "<template><h2>Süüdlased</h2><button type=button class=\"btn btn-primary btn-lg btn-block mt-1\">Lisa süüdlane</button><div class=\"panel panel-default suspect-panel\"><div class=panel-body><form><div class=row><div class=\"col-md-1 pull-right\"><button type=button class=\"btn btn-danger btn-md btn-remove\"><i class=\"fa fa-times\"></i></button></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Eesnimi</label><input type=text class=form-control></div><div class=\"form-group col-md-3 col-md-offset-3\"><label class=control-label>Perenimi</label><input type=text class=form-control></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Isikukood</label><input type=text class=form-control></div><div class=\"form-group col-md-2 col-md-offset-3\"><label class=control-label>Sünniaeg</label><input type=date class=form-control></div></div><br><div class=row><div class=\"form-group col-md-4\"><label class=control-label>Kodakondsus</label><select class=form-control><option></option></select></div><div class=\"form-group col-md-4 col-md-offset-2\"><label class=control-label>Amet</label><input type=text class=form-control></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Telefoninumber</label><input type=tel class=form-control></div><div class=\"form-group col-md-4 col-md-offset-3\"><label class=control-label>E-post</label><input type=tel class=form-control></div></div><div class=row><div class=\"form-group col-md-5\"><label for=address class=control-label>Aadress</label><input type=text class=form-control id=address><small class=\"form-text text-muted\">Tänav, maja, korter, linn</small></div></div><br><div class=row><div class=\"form-group col-md-8\"><label class=control-label for=eventDescription>Tundemärgid</label><textarea class=form-control id=eventDescription rows=3></textarea></div></div></form></div></div></template>"; });
define('text!subforms/witnesses-form.html', ['module'], function(module) { module.exports = "<template><h2>Tunnistajad</h2><button type=button class=\"btn btn-primary btn-lg btn-block mt-1\">Lisa tunnistaja</button><div class=\"panel panel-default suspect-panel\"><div class=panel-body><form><div class=row><div class=\"col-md-1 pull-right\"><button type=button class=\"btn btn-danger btn-md btn-remove\"><i class=\"fa fa-times\"></i></button></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Eesnimi</label><input type=text class=form-control></div><div class=\"form-group col-md-3 col-md-offset-3\"><label class=control-label>Perenimi</label><input type=text class=form-control></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Isikukood</label><input type=text class=form-control></div><div class=\"form-group col-md-2 col-md-offset-3\"><label class=control-label>Sünniaeg</label><input type=date class=form-control></div></div><br><div class=row><div class=\"form-group col-md-4\"><label class=control-label>Kodakondsus</label><select class=form-control><option></option></select></div><div class=\"form-group col-md-4 col-md-offset-2\"><label class=control-label>Amet</label><input type=text class=form-control></div></div><div class=row><div class=\"form-group col-md-3\"><label class=control-label>Telefoninumber</label><input type=tel class=form-control></div><div class=\"form-group col-md-4 col-md-offset-3\"><label class=control-label>E-post</label><input type=tel class=form-control></div></div><div class=row><div class=\"form-group col-md-5\"><label for=address class=control-label>Aadress</label><input type=text class=form-control id=address><small class=\"form-text text-muted\">Tänav, maja, korter, linn</small></div></div></form></div></div></template>"; });
define('text!resources/elements/progress-tracker.html', ['module'], function(module) { module.exports = "<template><require from=./progress-tracker.css></require><ul class=\"progress-indicator flexer\"><template repeat.for=\"page of pages\"><li class=${page.progressState} click.delegate=trackerClick(page.pageKey)><span class=bubble></span><span class=name>${page.name}</span></li></template></ul></template>"; });
define('text!resources/elements/top-scroller.html', ['module'], function(module) { module.exports = "<template><require from=./top-scroller.css></require><div class=scroll-top-wrapper><span class=scroll-top-inner><i class=\"fa fa-2x fa-arrow-circle-up\"></i></span></div></template>"; });
define('text!subforms/instructions-form.html', ['module'], function(module) { module.exports = "<template><h1>Politseile avalduse esitamine</h1><div class=\"row mt-1\"><div class=col-md-12><h4>Kui kellegi elu või tervis on vahetult ohus, siis helista viivitamatult hädaabinumbrile 112.</h4></div><div class=\"col-md-12 mt-1\"><p>Ära kasuta seda ankeeti raskest ja/või isikuvastasest kuriteost (vägistamine, tapmine, kehaline väärkohtlemine - löömine, peksmine vm) teatamiseks. Raskest kuriteost teada andmiseks pöördu lähimasse&nbsp;<a target=_blank href=https://www.politsei.ee/et/kontakt/politseijaoskondade-kontaktid.dot>politseijaoskonda</a>.</p></div><div class=\"col-md-12 mt-1\"><h4>Avalduses ei tohi esitada valeandmeid.</h4></div><div class=\"col-md-12 mt-1\"><p>Vajadusel tuleb menetleja kutsel tulla politseijaoskonda täiendavate ütluste andmiseks.</p></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map