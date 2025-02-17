export default class Popup {
    constructor(parent, custom_html, grid_size) {
        this.parent = parent;
        this.custom_html = custom_html;
        this.grid_size = grid_size;
        this.make();
    }

    make() {
        this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

        this.hide();

        this.title = this.parent.querySelector('.title');
        this.subtitle = this.parent.querySelector('.subtitle');
        this.pointer = this.parent.querySelector('.pointer');
    }

    show(options) {
        if (!options.target_element) {
            throw new Error('target_element is required to show popup');
        }

        const target_element = options.target_element;

        if (this.custom_html) {
            let html = this.custom_html(options.task);
            // html += '<div class="pointer"></div>';
            // html += '<div class="pointer"></div>';
            this.parent.innerHTML = html;
            this.pointer = this.parent.querySelector('.arrow');
        } else {
            // set data
            this.title.innerHTML = options.title;
            this.subtitle.innerHTML = options.subtitle;
            this.parent.style.width = this.parent.clientWidth + 'px';
        }

        // set position
        let position_meta;
        if (target_element instanceof HTMLElement) {
            position_meta = target_element.getBoundingClientRect();
        } else if (target_element instanceof SVGElement) {
            position_meta = options.target_element.getBBox();
        }

        const margin = 10;
        const right_side_space =
            this.grid_size.width -
            position_meta.x -
            position_meta.width -
            this.parent.clientWidth;
        if (margin < right_side_space) {
            options.position = 'right';
        } else {
            options.position = 'left';
        }

        if (options.position === 'left') {
            this.parent.style.left =
                position_meta.x - this.parent.clientWidth - 10 + 'px';
            this.parent.style.top =
                position_meta.y -
                this.parent.clientHeight +
                position_meta.height +
                'px';

            // this.pointer.style.transform = 'rotateZ(270deg)';
            // this.pointer.style.left = this.parent.clientWidth + 7 + 'px';
            // this.pointer.style.top = this.parent.clientHeight - 10 - 2 + 'px';
            this.pointer.style.left = this.parent.clientWidth + 12 + 'px';
            this.pointer.style.top = this.parent.clientHeight - 10 - 47 + 'px';
        } else {
            this.parent.style.left =
                position_meta.x + (position_meta.width + 10) + 'px';
            this.parent.style.top = position_meta.y + 'px';

            // this.pointer.style.transform = 'rotateZ(90deg)';
            // this.pointer.style.left = '-7px';
            // this.pointer.style.top = '2px';
            this.pointer.style.left = '-12px';
            this.pointer.style.top = '47px';
        }

        // show
        this.parent.style.display = 'block';
        this.parent.style.opacity = 1;
    }

    hide() {
        this.parent.style.display = 'none';
        this.parent.style.opacity = 0;
        this.parent.style.left = 0;
    }
}
