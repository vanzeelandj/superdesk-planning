import React from 'react';
import {shallow} from 'enzyme';
import {EventScheduleInput} from './index';
import sinon from 'sinon';
import moment from 'moment';
import {cloneDeep, set} from 'lodash';

describe('<EventScheduleInput />', () => {
    let item;
    let diff;
    let onChange;
    let readOnly;
    let pristine;
    let showRepeat;
    let showRepeatSummary;
    let formProfile;

    beforeEach(() => {
        item = {dates: {}};
        diff = null;

        readOnly = pristine = false;
        showRepeat = showRepeatSummary = true;

        onChange = sinon.spy((field, value) => set(diff, field, value));

        formProfile = {schema: {dates: {defaultDurationOnChange: 1}}};
    });

    const getShallowWrapper = () => {
        if (!diff) {
            diff = cloneDeep(item);
        }

        return shallow(
            <EventScheduleInput
                item={item}
                diff={diff}
                onChange={onChange}
                readOnly={readOnly}
                pristine={pristine}
                showRepeat={showRepeat}
                showRepeatSummary={showRepeatSummary}
                timeFormat="HH:mm"
                dateFormat="DD/MM/YYYY"
                formProfile={formProfile}
            />
        );
    };

    it('detects a non all day event', () => {
        item.dates = {
            start: '2016-10-15T13:01:11',
            end: '2016-10-15T14:01:11',
        };

        const wrapper = getShallowWrapper();

        expect(wrapper.state().isAllDay).toBe(false);
    });

    it('detects an all day event', () => {
        item.dates = {
            start: moment('2099-06-16T00:00'),
            end: moment('2099-06-16T23:59'),
        };

        const wrapper = getShallowWrapper();

        expect(wrapper.state().isAllDay).toBe(true);
    });

    describe('defaultDurationOnChange from formProfile', () => {
        it('sets the default duration', () => {
            const wrapper = getShallowWrapper();

            wrapper.instance().onChange('dates.start.time', moment('2099-06-16T00:00'));

            expect(diff.dates.start.isSame(
                diff.dates.end.clone().subtract(1, 'h')
            )).toBe(true);
        });

        it('doesnt set duration if defaultDurationOnChange is 0', () => {
            formProfile.schema.dates.defaultDurationOnChange = 0;

            const wrapper = getShallowWrapper();

            wrapper.instance().onChange('dates.start.time', moment('2099-06-16T00:00'));

            expect(diff.dates.end).toBeUndefined();
        });

        it('defaults to 1 hour', () => {
            delete formProfile.schema.dates.defaultDurationOnChange;
            const wrapper = getShallowWrapper();

            wrapper.instance().onChange('dates.start.time', moment('2099-06-16T00:00'));

            expect(diff.dates.start.isSame(
                diff.dates.end.clone().subtract(1, 'h')
            )).toBe(true);
        });
    });
});